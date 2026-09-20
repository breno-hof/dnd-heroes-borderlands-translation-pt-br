Hooks.once("babele.init", (babele) => {
  console.log(
    "D&D - Heroes of the Borderlands PT-BR | Registrando traduções..."
  );

  babele.register({
    module: "dnd-heroes-borderlands-translation-pt-br",
    lang: "pt-BR",
    dir: "compendium"
  });

  console.log(
    "D&D - Heroes of the Borderlands PT-BR | Traduções registradas."
  );
});