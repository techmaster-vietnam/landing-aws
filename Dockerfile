# build stage
FROM golang:alpine AS build-env

ENV WDIR techmaster-aws

WORKDIR /$WDIR

RUN apk add upx

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-w'

RUN upx -9 /$WDIR/landing-aws

# final stage
FROM alpine:latest

RUN mkdir -p app/ /app/dist

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy result binary go app to /app folder
COPY --from=build-env techmaster-aws/landing-aws /app
COPY --from=build-env techmaster-aws/dist/ /app/dist

ENTRYPOINT ["./landing-aws"]

EXPOSE 9382
