
# D&D - Heroes of the Borderlands (PT-BR)

Tradução comunitária para português brasileiro.

## Instalação pelo Foundry VTT

1. Acesse Setup → Add-on Modules → Install Module.
2. Insira o seguinte Manifest URL:

   https://github.com/breno-hof/dnd-heroes-borderlands-translation-pt-br/releases/latest/download/module.json

3. Clique em Install.
4. Ative o módulo no mundo.
5. Configure o idioma Português (Brasil).

## Download manual

[Última versão](https://github.com/breno-hof/dnd-heroes-borderlands-translation-pt-br/releases/latest/download/dnd-heroes-borderlands-translation-pt-br.zip)

[Releases](https://github.com/breno-hof/dnd-heroes-borderlands-translation-pt-br/releases)

## Build local

Requisitos:
- Node.js 22+
- Git
- zip

Execute:

```bash
npm run build
```

O arquivo ZIP será gerado em `dist/`.

## Publicação automática

1. Acesse a aba Actions do GitHub.
2. Selecione Build and Release.
3. Clique em Run workflow.

O workflow incrementa automaticamente a versão patch, cria a tag Git e publica uma GitHub Release com o manifesto e o ZIP.
