class Script {

    constructor() {
        this.uris = {
            "/api/list": "GET",
            "/api/remove": "DELETE",
            "/api/add": "POST"
        };

        this.init();
    }

    init() {
        this.lista();
        this.butoane();
    }

    lista() {
        this.func("/api/list", {}, (r) => {
            let $r = "";
            for(let x in r) {
                $r += this.$task(x, r[x]);
            }
            $(".toDoList").html($r);
        });
    }

    adaugare(text) {
        this.func("/api/add", { text }, (r) => {
            this.$add(r);
        });
    }

    stergere(index) {
        this.func("/api/remove", { index }, (r) => {
            this.$add(r);
        });
    }


    $task(index, props) {
        return `
            <div data-index="${index}">
                <div>${props.text}</div>
                <div class="del"><i class="far fa-times-circle"></i></div>
            </div>
        `;
    }

    $add(props) {
        let $r = "";
        for(let x in props) {
            $r += this.$task(x, props[x]);
        }
        $(".toDoList").html($r);
    }

    butoane() {
        let _this = this;
        $(document).on("click", ".toDoList div .del", function() {
            let index = $(this).parent().attr("data-index");
            _this.stergere(index);
        });
        $(document).on("click", "button", function() {
            let text = $("input").val();
            _this.adaugare(text);
            $("input").val("");
        });
    }
    
    func(url, data, cb) {
        $.ajax({
            url: url,
            method: this.uris[url],
            data,
            success: (resp) => {
                cb(resp);
            }
        });
    }

}

let scr = new Script();