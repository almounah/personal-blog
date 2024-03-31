package api

import (
	"fmt"
	"html/template"
	"net/http"
)

type ServeConfig struct {
	Ip          string
	Port        string
	TLSCertPath string
	TLSKeyPath  string
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("web/templates/index.html",
		"web/templates/common/navbar.html",
		"web/templates/common/rudeusdesk.html",
		"web/templates/common/mtscene.html",
		"web/templates/home/bio.html",
		"web/templates/home/work.html",
		"web/templates/home/hobbies.html",
		"web/templates/home/quickpres.html"))
	w.Header().Set("Content-type", "text/html")
	tmpl.Execute(w, nil)
}

func faviconHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "image/x-icon")
	http.ServeFile(w, r, "web/static/icons/favicon.ico")
}

func logoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "image/svg+xml")
	http.ServeFile(w, r, "web/static/images/logo.svg")
}

func mePicHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "image/png")
	http.ServeFile(w, r, "web/static/images/me.png")
}

func tailwindConfigHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/javascript")
	http.ServeFile(w, r, "web/static/tailwind.config.js")
}

func threejsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/javascript")
	http.ServeFile(w, r, "web/static/threejs-render.js")
}
func glbHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "model/gltf-binary")
	http.ServeFile(w, r, "web/static/desk.glb")
}

func Serve(conf ServeConfig) {
	http.HandleFunc("/me.png", mePicHandler)
	http.HandleFunc("/logo.svg", logoHandler)
	http.HandleFunc("/desk.glb", glbHandler)
	http.HandleFunc("/threejs-render.js", threejsHandler)
	http.HandleFunc("/tailwind.config.js", tailwindConfigHandler)
	http.HandleFunc("/favicon.ico", faviconHandler)
	http.HandleFunc("/", rootHandler)
	fmt.Println("Will now listen on " + conf.Ip + ":" + conf.Port)
	err := http.ListenAndServe(conf.Ip+":"+conf.Port, nil)
	if err != nil {
		fmt.Println("An error Occured")
	}

}
