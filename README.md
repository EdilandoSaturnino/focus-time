# Focus Time

Relógio minimalista de tela inteira com cronômetro embutido, feito em Electron.

## Recursos
- Cronômetro configurável (h:m:s) que aparece no canto superior direito ao passar o mouse
- Enquanto o cronômetro roda, o número central mostra a contagem regressiva; ao pausar/terminar, volta ao horário
- App desktop com Electron (contextIsolation + sandbox, CSP rígida)

## Pré‑requisitos
- Node.js 22 LTS (recomendado)
- Windows (fluxo de empacotamento configurado para .exe). Funciona em dev no macOS/Linux, mas o maker está focado em Windows

## Executar em desenvolvimento
```bash
npm install
npm run start
```

## Controles (UI)
- Passe o mouse no canto superior direito para revelar os controles
- Defina horas/minutos/segundos
- Iniciar/Pausar/Retomar/Zerar

## Build local (.exe)
Gera instaladores e artefatos usando Electron Forge:
```bash
npm run make
```
Saída em `out/`. No Windows, o instalador principal será algo como:
```
out/make/squirrel.windows/x64/focus-time-setup.exe
```

## Publicar releases (.exe) no GitHub
O workflow `Build and Release (Windows)` roda ao criar uma tag `v*`.

1. Garanta que o repositório do `package.json` aponta para o GitHub correto.
2. Faça commit/push do código.
3. Crie uma tag e envie:
```bash
git tag v1.0.1
git push origin v1.0.1
```
4. O GitHub Actions irá:
   - Instalar dependências
   - Rodar `npm run make`
   - Anexar artefatos gerados no Release (inclui `.exe`)

Os usuários podem baixar o `.exe` diretamente na página de Releases.

## Auto‑update
O projeto inclui `update-electron-app` no `main.js`. Para funcionar:
- Repositório público no GitHub
- Releases publicados com artefatos gerados

Quando você publicar uma nova versão (ex.: `v1.0.2`), clientes podem receber a atualização.

## Segurança
- `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`
- CSP em `index.html` restringe `default-src`, `script-src`, etc.
- Abertura de links externos bloqueada e redirecionada para o navegador padrão

## Scripts
- `npm run start` — dev com Electron Forge
- `npm run make` — gera artefatos (inclui `.exe` no Windows)
- `npm run package` — empacota sem criar instalador
- `npm run publish` — fluxo de publish do Forge (não usado no CI padrão deste projeto)