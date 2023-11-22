type ContentType = "post" | "page" | "asset" | string

function retrieve(content: ContentType) {
    // tbd
}

retrieve("pa") // not auto copmlete


type ContentType2 = "post" | "page" | "asset" | string & {}

function retrieve2(content: ContentType2) {
    // tbd
}

retrieve2("page") // You know get auto completion for the union literals