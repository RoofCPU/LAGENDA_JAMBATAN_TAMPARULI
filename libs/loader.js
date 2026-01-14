import * as THREE from "./three.js-r132/build/three.module.js";
import { GLTFLoader } from "./three.js-r132/examples/jsm/loaders/GLTFLoader.js";

// === GLTF MODEL LOADER ===
export const loadGLTF = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => resolve(gltf),    
      undefined,                  
      (error) => reject(error)    
    );
  });
};

// === AUDIO LOADER ===
export const loadAudio = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.AudioLoader();
    loader.load(
      path,
      (buffer) => resolve(buffer),
      undefined,
      (error) => reject(error)
    );
  });
};

// === VIDEO LOADER ===
export const loadVideo = (path) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = path;
    video.setAttribute("playsinline", ""); // Needed for mobile Safari
    video.load();

    video.addEventListener("loadedmetadata", () => resolve(video));
    video.addEventListener("error", () => reject(new Error(`Failed to load video: ${path}`)));
  });
};

// === SINGLE TEXTURE LOADER ===
export const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      path,
      (texture) => resolve(texture),
      undefined,
      (error) => reject(error)
    );
  });
};

// === MULTIPLE TEXTURES LOADER ===
export const loadTextures = (paths) => {
  const loader = new THREE.TextureLoader();
  const promises = paths.map((path) => {
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      );
    });
  });
  return Promise.all(promises);
};
