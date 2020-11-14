import 'aframe';
import 'aframe-particle-system-component';

import React from 'react';
import { Entity, Scene } from 'aframe-react';

import SEO from '../containers/SEO';
import VRBgSrc from '../assets/images/vr_bg2.jpg';

const VRScene: React.FunctionComponent = () => {
  return (
    <Scene>
      <SEO
        title="VR Tour"
        description="Welcome to virtual tour through my experience and skills"
      />
      <Entity
        geometry={{ primitive: 'box' }}
        material={{ color: 'red' }}
        position={{ x: 0, y: 0, z: -5 }}
      />
      <Entity primitive="a-sky" src={VRBgSrc} />
      <Entity light={{ type: 'point' }} />
      <Entity gltf-model={{ src: 'virtualcity.gltf' }} />
      <Entity text={{ value: 'Hello, WebVR!' }} position={{ z: -4 }} />
    </Scene>
  );
};

export default VRScene;
