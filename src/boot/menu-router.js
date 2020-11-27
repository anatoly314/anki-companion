// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ router }) => {
  // something to do
  window.ipcRenderer.on('route-change-request', (event, navigationRequest) => {
    console.log('router-change-request', navigationRequest.name);
    router.push({
      name: navigationRequest.name
    });
  })
}
