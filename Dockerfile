FROM alpine:latest

RUN mkdir -p app/ /app/dist

WORKDIR /app

# Copy result binary go app to /app folder
COPY /landing-aws /app
COPY /dist/ /app/dist

ENTRYPOINT ["./landing-aws"]

EXPOSE 9382
