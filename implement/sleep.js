function sleep(wait) {
  return new Promise(resolve => setTimeout(() => resolve(), wait));
}

function main() {
  console.log(1);
  sleep(1000).then(async () => {
    console.log(2);
    await sleep(1000);
    console.log(3);
  });
}

main();
