Hooks.once("init", () => {
  if (typeof Babele === "undefined") {
    console.warn(
      "D&D - Heroes of the Borderlands PT-BR | Babele não está instalado ou ativo."
    );
    return;
  }

  Babele.get().register({
    module: "dnd-heroes-borderlands-pt-br",
    lang: "pt-BR",
    dir: "compendium"
  });
});