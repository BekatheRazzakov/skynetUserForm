import React, {useRef} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  removeImage?: (key: string) => void;
  label: string;
  file: File | null;
  currentImageInput: string;
}

const FileInput: React.FC<Props> = (
  {handleImageChange, removeImage, file, label, currentImageInput}
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleImageChange) {
      handleImageChange(e, currentImageInput);
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        style={{display: 'none'}}
        ref={inputRef}
        onChange={onFileChange}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <Box className="form-images">
            {
              file ?
                <Typography className="image-labels">
                  <Button
                    className="delete-image"
                    variant="outlined"
                    startIcon={<DeleteIcon/>}
                    onClick={() => {
                      if (removeImage) {
                        removeImage(currentImageInput);
                      }
                    }}
                  />
                  {file.name}
                </Typography> : label
            }
          </Box>
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={activateInput} style={{fontSize: '10px'}}>
            Загрузить
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
