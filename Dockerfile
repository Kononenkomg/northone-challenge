FROM denoland/deno:1.18.2

EXPOSE 4000

WORKDIR /app

USER root

COPY . .
RUN deno cache --unstable ./deps.ts

ADD . .

RUN deno cache --unstable ./main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./main.ts"]