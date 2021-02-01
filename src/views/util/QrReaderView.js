import React, {Component, useState} from 'react'
import QrReader from 'react-qr-reader'
import {Button} from "@material-ui/core";

import Util from "../../lib/Util";



export default function QrReaderView({onScannedId,...rest}) {

  const [displayQrcodeReader,setDisplayQrcodeReader]=useState(false);


  const handleScan = async data => {
      if (data) {

        onScannedId(Util.getIdFromUrl(data));  //notifier le component parent
        setDisplayQrcodeReader(false);


      }
  }

  const handleError = err => {
    console.error(err)
  }

  const handleDisplayClick = ()=>{

        setDisplayQrcodeReader(true);

  }

  const handleCancelClick = ()=>{

    setDisplayQrcodeReader(false);

  }



  return (
      <div>
        {
          displayQrcodeReader?(  //tant que on a pas scanné
            <div>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelClick}
                  style={{ margin: '5px' }}
                >
                  Annuler
                </Button>
            </div>
          ): //else

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleDisplayClick}
                    >
                    Attribuer
                  </Button>
        }



      </div>
    )

}
