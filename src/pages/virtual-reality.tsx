import 'aframe';
import 'aframe-room-component';

import React from 'react';
// import reactifyWc from 'reactify-wc';
import reactifyWc from '../wr';
import { Entity, Scene } from 'aframe-react';

import SEO from '../containers/SEO';
// import VRBgSrc from '../assets/images/vr_bg2.jpg';
import ManGlbSrc from '../assets/models/man.glb';
import Layout from '../containers/Layout';

interface RwProps {
  position?: {
    x: number;
    y: number;
    z: number;
  };
  material?: {
    color: string;
  };
}

const VRScene: React.FunctionComponent = () => {
  const Assets = reactifyWc<React.HTMLProps<HTMLElement>>('a-assets');
  // const AssetsItem = reactifyWc<React.HTMLProps<HTMLElement>>('a-assets-item', {
  //   forceProperty: ['id'],
  //   forceAttribute: ['id'],
  // });
  const RwRoom = reactifyWc<React.HTMLProps<HTMLElement> & RwProps>('rw-room');
  const RwWall = reactifyWc<React.HTMLProps<HTMLElement> & RwProps>('rw-wall');
  const RwDoorHole = reactifyWc<React.HTMLProps<HTMLElement> & RwProps>(
    'rw-doorhole'
  );
  const RwDoorLink = reactifyWc<React.HTMLProps<HTMLElement> & RwProps>(
    'rw-doorlink'
  );

  return (
    <Layout withoutFooter withoutHeader fullSizeContent blurGatsbyWrapper>
      <SEO
        title="VR Tour"
        description="Welcome to virtual tour through my experience and skills"
      />
      <Scene embedded>
        <Assets>
          <a-assets-item id="man" src={ManGlbSrc} />
          <img
            id="groundTexture"
            src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          />
        </Assets>

        <Entity
          id="visitor-camera"
          primitive="a-camera"
          active={false}
          look-controls={{ enabled: true }}
          wasd-controls={{ enabled: true, acceleration: 70 }}
        />
        <Entity primitive="a-sky" material={{ color: '#f6f6f2' }} />
        <Entity
          primitive="a-plane"
          src="#groundTexture"
          rotation={{ x: -90, y: 0, z: 0 }}
          width="30"
          height="30"
        />
        <Entity
          gltf-model="#man"
          position={{ x: 0.2, y: 0, z: -3 }}
          rotation={{ x: 0, y: -90, z: 0 }}
        />
        <RwRoom position={{ x: -2, y: 0, z: -2 }} material={{ color: '#866' }}>
          <RwWall position={{ x: 4, y: 0, z: 0 }}></RwWall>
          <RwWall position={{ x: 4, y: 0, z: 4 }}></RwWall>
          <RwWall position={{ x: 0, y: 0, z: 4 }}></RwWall>
          <RwWall position={{ x: 0, y: 0, z: 0 }}>
            <RwDoorHole id="holeA"></RwDoorHole>
            <RwDoorLink
              from="#holeA"
              to="#holeB"
              position={{ x: 2.5, y: 0, z: 0 }}
            ></RwDoorLink>
          </RwWall>
        </RwRoom>
        <RwRoom position={{ x: 0, y: 0, z: -3 }}>
          <RwWall
            position={{ x: 1, y: 0, z: -1 }}
            material={{ color: '#787' }}
          ></RwWall>
          <RwWall position={{ x: 1, y: 0, z: 1 }} material={{ color: '#877' }}>
            <RwDoorHole id="holeB"></RwDoorHole>
          </RwWall>
          <RwWall
            position={{ x: -1, y: 0, z: 1 }}
            material={{ color: '#878' }}
          ></RwWall>
          <RwWall
            position={{ x: -1, y: 0, z: -1 }}
            material={{ color: '#778' }}
          ></RwWall>
        </RwRoom>
      </Scene>
    </Layout>
  );
};

export default VRScene;
