import Webcam from "react-webcam";
import React from "react";
import {Button} from "@material-ui/core";
import QrReaderView from "./QrReaderView";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export default function WebcamCapture({handleImageTaken,qrcodeScanned,cancelImagePicker,...rest}) {

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      handleImageTaken(imageSrc);
      console.log(imageSrc)
    },
    [webcamRef]
  );

  return (
        <>
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={200}
          />
          <ButtonGroup size="small" aria-label="small outlined button group" >
            <Button color="secondary"
                    variant="contained"
                    onClick={capture}>
              Prendre une photo
            </Button>
            <Button variant="outlined"
                    color="secondary"
                    onClick={cancelImagePicker}>
              Annuler
            </Button>

          </ButtonGroup>

    </>
  );
};
