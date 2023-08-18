const data = window.MAP_DATA;
const paths = document.querySelectorAll("path");
const townships = document.querySelector(".townships");
const currentPlace = document.querySelector(".current-place");
const showTownships = (region) => {
  const regionData = data.find((d) => d.name === region);
  let townshipsList = "";
  regionData.townships.forEach((t, index) => {
    townshipsList += `
        <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          ${index + 1}
        </th>
        <td class="px-6 py-4">${t.township}</td>
        <td class="px-6 py-4">${t.township_mm}</td>
        <td class="px-6 py-4">${regionData.name}</td>
      </tr>
        `;
    townships.innerHTML = townshipsList;
    currentPlace.innerText = regionData.name;
  });
};

const handleHover = (path) => {
  let timeOut;
  return () => {
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      document.querySelector(".map_active")?.classList.remove("map_active");
      path.classList.add("map_active");
      showTownships(path.getAttribute("name"));
    }, 200);
  };
};

!(function (defultRegion, showTownships) {
  document
    .querySelector(`path[name="${defultRegion}"]`)
    .classList.add("map_active");
  showTownships(defultRegion);
})("Yangon", showTownships);

paths.forEach((path) => {
  path.addEventListener("mouseover", handleHover(path));
});
