let images = [];
const section = document.querySelector("#section");
let search = document.querySelector("#search");


const addImageToSection = (image, section) => {

    const img = document.createElement("a")
    img.href = `./images/${image.filename}`;

    img.setAttribute("title",image.title + "   —  "  +  "<span style='font-weight: lighter'>"+image.description+"</span>"  + "<br>" + image.location);
    img.setAttribute("data-id",image.filename);
    img.setAttribute("rel","lightbox[gallery]");
    img.setAttribute("alt",image.description);

    const img2 = document.createElement("img")
    img2.src = `./images/${image.filename}`;
    img.innerHTML = img2.textContent;
    img.appendChild(img2)
    section.appendChild(img)

}

fetch("images.json").then(res => res.json()).then(data => {
    images.push(...data)
    images.forEach(image => addImageToSection(image, section))
})

search.addEventListener("input", event => {
    localStorage.setItem("search", event.target.value)
    section.innerHTML = ''
    images
        .filter(image => ((image.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) || (image.description.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
        .forEach(image => addImageToSection(image, section))
})