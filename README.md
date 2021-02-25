# Nuber Eats

The Backend of Nuber Eats Clone

## nestjs setup

```
npm i -g @nestjs/cli
```

## Nuber Eats Clone Coding

- Course Structure

1. GraphQL이 Nest.js에서 어떻게 동작하는지에 대해 익숙해 지기
   Nest.js에서 DB와 GraphQL의 동작을 확실히 이해 하는게 중요하다. 동작에 대해 이해하고 나서 클론코딩 시작

## app.module.ts

앱 모듈은 main.ts로 import 되는 유일한 모듈이다.

main.ts는 application을 실행하기 위한 것!

app.module이 하는 것은 우리의 DB 가져오기 GraphQL, 유저 등등 모든 것들을 가져옴
즉, 사용하는 모듈은 모두 app.module에 추가되어야 함
app.module에 GraphQL 모듈을 추가
