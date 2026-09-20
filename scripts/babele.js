Hooks.once("init", () => {
  if (typeof Babele === "undefined") {
    console.error(
      "D&D - Heroes of the Borderlands PT-BR | Babele não está instalado ou ativo."
    );
    return;
  }

  Babele.get().register({
    module: "dnd-heroes-borderlands-translation-pt-br",
    lang: "pt-BR",
    dir: "compendium"
  });

  console.log(
    "D&D - Heroes of the Borderlands PT-BR | Traduções Babele registradas."
  );
});