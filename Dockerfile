# build stage
FROM golang:alpine AS build-env

ENV WDIR techmaster-aws

WORKDIR /$WDIR

RUN apk add git

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w'

FROM node:16-alpine AS webpack-dist

WORKDIR /app

COPY package.json ./

COPY webpack.* ./

RUN yarn install

RUN mkdir -p ./src

COPY src ./src

RUN yarn run build

FROM alpine:latest

RUN mkdir -p app/ /app/dist

WORKDIR /app

# Copy result binary go app to /app folder
COPY --from=build-env /techmaster-aws/landing-aws /app
COPY --from=webpack-dist /app/dist/ /app/dist

ENTRYPOINT ["./landing-aws"]

EXPOSE 9382
