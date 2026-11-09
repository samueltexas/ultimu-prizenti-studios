# Publicação GitHub e Netlify

O percurso completo está em MANUAL.md (secções 3 a 6) e MANUAL.pdf.

Configuração: repositório samueltexas/ultimu-prizenti-studios; Node.js 24;
build `npm run build`; publish `dist`; raiz do repositório sem subpasta.
Os MP4 de apresentação estão incluídos no Git, todos abaixo de 100 MiB. Não publicar
os originais nem docs/private. O primeiro clone transfere cerca de 365 MB de recursos.

A Netlify fornece URL no build. SITE_URL permite definir um domínio próprio.
Activar Forms detection e publicar novamente; configurar notificações de contact
e testimonials para ultimuprizenti@gmail.com. A revisão de testemunhos é manual,
sem publicação automática ou painel próprio.

O plano Free tem limites de créditos e de utilização; não significa tráfego ilimitado.
Não activar upgrades automáticos. Um domínio próprio é opcional e pago separadamente.
Os MP4 excedem o limite de 25 MiB do Cloudflare Pages: não enviar esta entrega para
esse serviço sem rever o alojamento dos vídeos.

Fontes consultadas para esta entrega:

- https://docs.netlify.com/build/configure-builds/overview/
- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/notifications/
- https://docs.netlify.com/manage/forms/usage-and-billing/
- https://www.netlify.com/pricing/
- https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
