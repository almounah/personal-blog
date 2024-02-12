package api

import (
	"fmt"
	"net/http"
)

type ServeConfig struct {
	Ip          string
	Port        string
	TLSCertPath string
	TLSKeyPath  string
}

func Serve(conf ServeConfig) {
	err := http.ListenAndServe(conf.Ip+":"+conf.Port, nil)
    if err != nil {
        fmt.Println("An error Occured")
    }

}
