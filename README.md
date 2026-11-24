# Digital Start — site de vendas do e-book

Página de vendas estática, responsiva e sem dependências de build, pronta para publicação no GitHub Pages.

## Arquivos

- `index.html` — página de vendas, oferta, FAQ e modal Pix.
- `styles.css` — identidade visual, mockups CSS, responsividade e animações leves.
- `script.js` — menu, modal, copiar Pix, configuração do atendimento e interações.
- `privacidade.html` e `termos.html` — páginas informativas vinculadas no rodapé.

## Configuração da oferta

O valor atual é **R$ 35,00**. As configurações centralizadas ficam no início de `script.js`:

```js
const STORE_CONFIG = {
  priceLabel: 'R$ 35,00',
  priceValue: '35,00',
  whatsappPhone: '', // DDI + DDD + número, somente dígitos, quando disponível
  pixKey: '6437e029-2f87-4ba5-ad07-7ba09488143b',
  productName: 'Como Ganhar Dinheiro na Internet do Zero em 2026'
};
```

A chave Pix é copiada pelo botão no checkout. O WhatsApp permanece sem link enquanto `whatsappPhone` estiver vazio; nesse estado, a interface avisa que o canal está sendo configurado. Quando houver um número real, configure-o no formato internacional, apenas com dígitos (por exemplo, DDI + DDD + número). O site não simula confirmação de pagamento: a verificação é manual.

## Publicar no GitHub Pages

Nas configurações do repositório, abra **Pages**, selecione a branch `main` e a pasta `/ (root)`. Não é necessária etapa de build.

## Observações

- O e-book original está referenciado na apresentação do produto, mas o conteúdo completo não é incorporado ao site.
- Os tópicos exibidos são apresentados como introdução geral, sem inventar capítulos ou prometer resultados.
- As fontes tipográficas usam Google Fonts; há fontes de sistema como alternativa.
- Para automatizar cobrança, confirmação e entrega futuramente, integre um gateway e um backend seguro. Nunca coloque credenciais privadas no JavaScript público.
