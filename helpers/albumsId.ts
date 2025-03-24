export function stringToAlbumList(albumIds:string) {
    return albumIds.split(" ")
    .map((id) => parseInt(id))
    .filter((id) => !isNaN(id))
    .map((album) => `&albumId=${album}`)
    .join("");
}