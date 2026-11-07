// Mantém a marcação e as classes CSS da seção de portfólio já existente.
// Conteúdo do Decap CMS é mostrado com textContent (não com HTML arbitrário).
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = String(text);
  return node;
}

function projectCard(project, index) {
  const li = element('li');
  const kind = index === 0 ? 'portfolio-card--feature' : index < 3 ? 'portfolio-card--side' : '';
  const article = element('article', `portfolio-card${kind ? ` ${kind}` : ''}`);
  const cover = element('div', 'portfolio-cover');
  const image = element('img');
  image.src = String(project.imagem || '');
  image.alt = String(project.alt || project.titulo || '');
  image.loading = index === 0 ? 'eager' : 'lazy';
  image.decoding = 'async';
  cover.append(image);

  // Rótulo existente no primeiro cartão do site.
  if (index === 0) cover.append(element('p', 'visually-hidden', 'O que estamos fazendo agora'));

  const body = element('div', 'portfolio-body');
  const meta = element('div', 'portfolio-meta');
  meta.append(element('p', 'portfolio-tag', project.categoria || 'Projeto'));
  const time = element('time', 'portfolio-date', project.periodo || '');
  if (project.data) time.dateTime = String(project.data);
  meta.append(time);
  body.append(meta);
  body.append(element('h3', 'portfolio-name', project.titulo || 'Projeto sem título'));
  body.append(element('p', 'portfolio-summary', project.resumo || ''));
  article.append(cover, body);
  li.append(article);
  return li;
}

export async function initPortfolio(root = document) {
  const top = root.querySelector('.portfolio-top');
  const rest = root.querySelector('.portfolio-rest');
  if (!top || !rest) return;

  try {
    // Resolve a partir da raiz da landing page, incluindo /website/ no GitHub Pages.
    const url = new URL('data/projetos.json', document.baseURI);
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.projetos)) throw new Error('Campo "projetos" ausente');

    const projects = data.projetos
      .filter(p => p && p.visivel !== false)
      .sort((a, b) => Number(a.ordem ?? 99) - Number(b.ordem ?? 99));

    const topFragment = document.createDocumentFragment();
    const restFragment = document.createDocumentFragment();
    projects.forEach((p, index) => {
      const card = projectCard(p, index);
      (index < 3 ? topFragment : restFragment).append(card);
    });
    top.replaceChildren(topFragment);
    rest.replaceChildren(restFragment);
  } catch (error) {
    console.error('[DEGRAU] Falha ao carregar dados do portfólio:', error);
    // O HTML original pode ser mantido como fallback durante a migração.
  }
}
