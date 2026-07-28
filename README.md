# BioDesign — Landing Page

Landing page da página inicial do projeto **BioDesign**, uma iniciativa de
arquitetura sustentável e reaproveitamento de materiais. Desenvolvida em
**HTML5, CSS3 e JavaScript puro**, sem frameworks ou bibliotecas externas
(exceto as fontes do Google Fonts).

## Estrutura do projeto

```
/BioDesign
│
├── index.html
│
├── css/
│   ├── style.css          → tokens de design, layout, sidebar, seções
│   ├── responsive.css     → breakpoints (notebook, tablet, celular)
│   └── animations.css     → keyframes e Scroll Reveal
│
├── js/
│   ├── script.js          → inicialização geral, Scroll Reveal, FAQ, newsletter
│   ├── menu.js             → menu lateral / hambúrguer mobile
│   ├── gallery.js          → lightbox da galeria
│   └── scroll.js           → parallax, navbar ativa, voltar ao topo
│
├── assets/
│   ├── images/             → reservado para as fotos reais do projeto
│   ├── icons/               → reservado para ícones adicionais
│   └── logo/                → favicon.svg
│
└── README.md
```


## Paleta de cores

| Uso        | Cor       |
|------------|-----------|
| Primária   | `#3F6D46` |
| Secundária | `#6F8F61` |
| Clara      | `#F6F6F2` |
| Texto      | `#2D2D2D` |
| Detalhes   | `#A5C49B` |

## Tipografia

- **Playfair Display** — títulos
- **Poppins** — textos

## Funcionalidades JavaScript

- Scroll Reveal (`IntersectionObserver`) com atraso escalonado por elemento
- Scroll suave adquirido pela biblioteca do GSAP
- Parallax suave na imagem do Hero
- Navbar lateral destacando a seção visível no momento
- Botão "voltar ao topo" com exibição condicional
- Lazy loading nativo (`loading="lazy"`) com fallback via `IntersectionObserver`
- Menu mobile em formato hambúrguer com painel deslizante e overlay
- Lightbox com navegação por teclado (setas e ESC) e por botões
- Acordeão de Perguntas Frequentes
- Validação simples do formulário de newsletter (sem backend conectado)

## Acessibilidade

- Link "pular para o conteúdo"
- Estados de foco visíveis (`:focus-visible`)
- Atributos `aria-*` em menu, lightbox e FAQ
- Respeita `prefers-reduced-motion`
- Textos alternativos descritivos em todas as imagens
