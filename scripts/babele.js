Hooks.once("init", () => {
  console.log(
    "=============================================="
  );
  console.log(
    "HEROES BORDERLANDS PT-BR | SCRIPT CARREGADO"
  );
  console.log(
    "=============================================="
  );

  console.log(
    "HEROES BORDERLANDS PT-BR | game.babele:",
    game.babele
  );

  if (!game.babele) {
    console.error(
      "HEROES BORDERLANDS PT-BR | game.babele NÃO está disponível."
    );
    return;
  }

  game.babele.register({
    module: "dnd-heroes-borderlands-translation-pt-br",
    lang: "pt-BR",
    dir: "compendium"
  });

  console.log(
    "HEROES BORDERLANDS PT-BR | TRADUÇÕES REGISTRADAS"
  );
});