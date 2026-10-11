# DEGRAU · Design System visual

Página estática para consultar as cores, a tipografia, os botões e o grid medidos no Figma do projeto. Não é o site institucional.

Abra `stylesGuide.html` no navegador. Não há etapa de build. O HTML carrega só `style/style.css`, que importa o restante.

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

Arquivo Figma `DEGRAU · Escritório Modelo e Empregabilidade`, Page 1.
