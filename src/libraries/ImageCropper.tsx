import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/profileSlice';
import { showToast } from '../utils/toast';

interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ImageCropperProps {
    image: string;
    onCropComplete: (croppedImage: Blob) => void;
    onCancel: () => void;
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
`;

const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete, onCancel }) => {
    const dispatch = useDispatch();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropChange = useCallback((crop: { x: number; y: number }) => {
        setCrop(crop);
    }, []);

    const onZoomChange = useCallback((zoom: number) => {
        setZoom(zoom);
    }, []);

    const onCropCompleteHandler = useCallback(( croppedAreaPixels: Area) => {
    // const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = useCallback(async (imageSrc: string, pixelCrop: Area) => {
        const image = new Image();
        image.src = imageSrc;

        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );
        }

        return new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
            }, 'image/jpeg');
        });
    }, []);

    const handleCropComplete = useCallback(async () => {
        if (croppedAreaPixels) {
            try {
                showToast('Uploading cropped image...', 'info');
                dispatch(setLoading(true));
                const croppedImage = await getCroppedImage(image, croppedAreaPixels);
                onCropComplete(croppedImage);
            } catch (e) {
                console.error(e);
            } finally {
                dispatch(setLoading(false));
            }     
        }
    }, [croppedAreaPixels, getCroppedImage, image, onCropComplete, dispatch]);
    // }, [croppedAreaPixels, getCroppedImage, image, onCropComplete]);

    return (
        <PopupOverlay>
            <PopupContent>
                <CropperContainer>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteHandler}
                    />
                </CropperContainer>
                <div>
                    <Button onClick={handleCropComplete}>Crop and Upload</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ImageCropper;