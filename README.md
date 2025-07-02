# Planne 📋

Aplicativo mobile de organização de tarefas pessoais, com autenticação via OAuth 2.0 e persistência por usuário usando MMKV.

## 🔐 Autenticação

A autenticação é feita via OAuth 2.0 contra o sistema IAS da Interfocus.


## 📦 Armazenamento

Utilizamos `react-native-mmkv` para persistir os dados de forma segura e rápida:

- **Storage global (`default`)**: armazena o usuário logado atualmente
- **Storage individual por usuário (`userId`)**: armazena as tarefas e preferências

Assim, ao fazer logout, os dados do usuário **não são apagados**, permitindo que ele veja suas tarefas novamente ao logar.

## ✅ Funcionalidades

- Login OAuth com redirecionamento via deep linking
- Listagem de tarefas por data
- Filtro por status: pendente, concluído ou ambos
- Armazenamento de tarefas por usuário
- Logout com persistência das informações
- BottomSheet customizado para filtros
- Estilo responsivo com tema próprio

  
## 🧪 Para rodar
npm install
npx expo run:android

