console.log(
  "HEROES BORDERLANDS PT-BR | babele.js carregado"
);

Hooks.once("babele.init", (babele) => {
  console.log(
    "HEROES BORDERLANDS PT-BR | babele.init disparado",
    babele
  );

  const result = babele.register({
    module: "dnd-heroes-borderlands-translation-pt-br",
    lang: "pt-BR",
    dir: "compendium"
  });

  console.log(
    "HEROES BORDERLANDS PT-BR | register() retornou:",
    result
  );
});