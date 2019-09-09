import saloons from "./saloons";
export default function getSaloons() {
  return new Promise((resolve, reject) => {
    resolve(saloons);
  });
}
