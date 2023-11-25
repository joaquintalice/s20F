document.addEventListener('DOMContentLoaded', main);

function main() {
    addDownloadButtonClickEvent();
}

function addDownloadButtonClickEvent() {
    const downloadButton = document.getElementById('download-btn');
    downloadButton.addEventListener('click', () => {
        const modalImage = document.getElementById('modalImage');
        const imageUrl = modalImage.src;
        fetchFile(imageUrl);
    });
}

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
    });
}