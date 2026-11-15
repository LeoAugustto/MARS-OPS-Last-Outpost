# CLAUDE.md

As regras do projeto ficam no AGENTS.md (compartilhado com ChatGPT/Codex e Lovable). Siga-as sempre:

@AGENTS.md

## Específico do Claude Code
- Responda ao time em **português**.
- Antes de editar, confira em `AGENTS.md` → "Mapa de pastas e DONOS" se a pasta é da pessoa que está pedindo. Se não for, avise.
- Depois de mexer em `src/game/` ou `src/content/`, rode `npm test`. Depois de mexer em UI, rode `npm run build`.
- Para adicionar evento, siga o checklist do AGENTS.md e escreva os textos nos 5 idiomas na mesma tarefa.
- Não faça commit/push sem o pedido de quem está usando. Commits terminam com a linha de co-autoria padrão.
- Bugs do GitHub: use a skill `/corrige-issues` (ou o agente `dev-bugs` para uma issue por vez). Ela confirma o bug com fotos no PC e no celular (`.claude/ferramentas/fotos.mjs`) antes de corrigir.

## Retomada de trabalho

O bloco **Continuidade entre Codex e Claude Code** de `AGENTS.md`, importado acima, também vale para o Claude Code. Leia `PROJECT_CONTEXT.md` e `SESSION_HANDOFF.md`, confira o Git na raiz do checkout e atualize o handoff antes de transferir a tarefa.
