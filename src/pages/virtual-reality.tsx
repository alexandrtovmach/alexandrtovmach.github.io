import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-supercraft-loader';

import React from 'react';
import { Entity, Scene } from 'aframe-react';

import SEO from '../containers/SEO';
import VRBgSrc from '../assets/images/vr_bg2.jpg';
import ManGlbSrc from '../assets/models/man.glb';

const VRScene: React.FunctionComponent = () => {
  return (
    <Scene>
      <SEO
        title="VR Tour"
        description="Welcome to virtual tour through my experience and skills"
      />
      <a-assets>
        <a-asset-item id="man" src={ManGlbSrc}></a-asset-item>
      </a-assets>
      <Entity id="rig" position="25 10 0">
        <Entity camera wasdControlsEnabled></Entity>
      </Entity>
      <Entity primitive="a-sky" src={VRBgSrc} />
      <Entity
        gltf-model="#man"
        position={{ x: 0.2, y: 0, z: -2 }}
        rotation={{ x: 0, y: -90, z: 0 }}
      />
    </Scene>
  );
};

export default VRScene;
