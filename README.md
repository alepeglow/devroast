# devroast

`devroast` e uma aplicacao web divertida onde voce cola um trecho de codigo e recebe um roast brutalmente honesto de volta.

Este projeto esta sendo construido durante o **NLW da Rocketseat**, acompanhando as aulas do evento.

## O que o app faz

- permite colar um trecho de codigo em uma area com visual de terminal/editor
- oferece um modo de roast para uma experiencia mais sarcastica
- mostra um leaderboard com os codigos mais duvidosos
- apresenta o codigo em uma interface visual inspirada em editor
- usa uma identidade visual propria baseada no design do projeto

## Estado atual

Hoje o projeto ja conta com:

- uma homepage baseada no design selecionado no Pencil
- uma biblioteca de UI reutilizavel com botoes, toggles, badges, code blocks, score rings, cards e mais
- uma secao de leaderboard reutilizavel feita com compound components
- dados estaticos na interface por enquanto, sem integracao com API

## Por que esse projeto existe

A ideia do `devroast` e transformar code review em algo mais divertido, visual e memoravel, em vez de algo frio e mecanico.

## Proximos passos

- conectar a interface a uma API real
- permitir envio de codigo e retorno de roasts gerados
- expandir o leaderboard para uma pagina propria
- construir as proximas telas do design

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.
