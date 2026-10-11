# DEGRAU · Design System visual

Página estática para consultar as cores, a tipografia, os botões e o grid medidos no Figma do projeto. Não é o site institucional.

Abra `index.html` no navegador. Não há etapa de build. O HTML carrega só `style/style.css`, que importa o restante.

## Pastas

- `style/style.css` — entrada dos estilos
- `style/base/reset.css` — reset
- `style/base/tokens.css` — tokens em `:root`
- `style/typography/fonts.css` — classes de texto (`f-title`, `f-body`, …)
- `style/components/buttons.css` — botões e campo
- `style/guide/` — layout só desta página de documentação
- `js/main.js` — entrada
- `js/modules/clipboard.js` — copia o HEX da cor ou a classe do texto

Clique numa linha de tipografia para copiar a classe e usar no HTML:

```html
<p class="f-title">Construindo degraus</p>
```

## Origem dos tokens

Arquivo Figma `DEGRAU · Escritório Modelo e Empregabilidade`, Page 1. Não há variáveis nem estilos nomeados. As cores vêm dos rótulos do frame `degrau-paleta-de-cores 1`. Tamanhos, pesos, raios, alturas e vãos foram lidos dos nós do layout desktop de 1440 px.

A altura de linha está em automático e o espaçamento entre letras está em 0. Os pesos usados são Regular 400 e Bold 700.

Não foram criados tokens para SemiBold, botão de 40 px, tracking de 0,25 em, sombra, anel de foco de 3 px, breakpoints ou grade de 12 colunas: esses dados não estão no arquivo.
