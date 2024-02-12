package main

import (
	"fmt"
	"personal-blog/pkg/api"
)

func main() {
	fmt.Println("Starting Back end")
	conf := api.ServeConfig{Ip: "127.0.0.1", Port: "8080", TLSCertPath: "", TLSKeyPath: ""}
	api.Serve(conf)
}
