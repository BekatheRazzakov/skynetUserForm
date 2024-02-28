import React, {useRef} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage?: (filename: string) => void;
  handleLocationImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeLocationImage?: () => void;
  label: string;
  files: File[] | undefined;
  currentImageInput: string;
}

const FileInput: React.FC<Props> = (
  {handleImageChange, removeImage, files, label, handleLocationImageChange, removeLocationImage, currentImageInput}
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentImageInput === 'location' && handleLocationImageChange) {
      handleLocationImageChange(e);
    } else if (currentImageInput === 'passport' && handleImageChange) {
      handleImageChange(e);
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFileNames = () => {
    if (files) {
      return files.map(file => {
        return file.name;
      });
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
              files?.length ?
                getFileNames()?.map((filename, index) => (
                  <Typography className="image-labels" key={index}>
                    <Button
                      className="delete-image"
                      variant="outlined"
                      startIcon={<DeleteIcon/>}
                      onClick={() => {
                        if (currentImageInput === 'location' && removeLocationImage) {
                          removeLocationImage();
                        } else if (currentImageInput === 'passport' && removeImage) {
                          removeImage(filename);
                        }
                      }}
                    />
                    {filename}
                  </Typography>
                )) : label
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
