import 'aframe';
import 'aframe-room-component';

import React from 'react';
// import reactifyWc from 'reactify-wc';
import reactifyWc from '../components/ReactifyWebComponent';
import { Entity, Scene } from 'aframe-react';

import SEO from '../containers/SEO';
// import VRBgSrc from '../assets/images/vr_bg2.jpg';
import ManGlbSrc from '../assets/models/man.glb';
import Layout from '../containers/Layout';

interface RwProps {
  position?: string;
  material?: string;
  from?: string;
  to?: string;
}

interface PlaneProps {
  rotation?: string;
}

const VRScene: React.FunctionComponent = () => {
  const Assets = reactifyWc('a-assets');
  const Plane = reactifyWc<PlaneProps>('a-plane');
  const AssetsItem = reactifyWc('a-assets-item');
  const RwRoom = reactifyWc<RwProps>('rw-room');
  const RwWall = reactifyWc<RwProps>('rw-wall');
  const RwDoorHole = reactifyWc<RwProps>('rw-doorhole');
  const RwDoorLink = reactifyWc<RwProps>('rw-doorlink');

  return (
    <Layout withoutFooter withoutHeader fullSizeContent blurGatsbyWrapper>
      <SEO
        title="VR Tour"
        description="Welcome to virtual tour through my experience and skills"
      />
      <Scene embedded>
        <Assets>
          <AssetsItem id="man" src={ManGlbSrc} className="testclass" />
          <img
            id="groundTexture"
            src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          />
        </Assets>

        <Entity
          id="visitor-camera"
          primitive="a-camera"
          cursor={{ rayOrigin: 'mouse' }}
          active={false}
          look-controls={{ enabled: true }}
          wasd-controls={{ enabled: true, acceleration: 70 }}
        />
        <Entity primitive="a-sky" material={{ color: '#f6f6f2' }} />
        <Plane color="#222" rotation="-90 0 0" width="20" height="20" />
        <Entity
          gltf-model="#man"
          position={{ x: 0.2, y: 0, z: -3 }}
          rotation={{ x: 0, y: -90, z: 0 }}
        />
        <RwRoom position="-2 0 -2" material="color:#866">
          <RwWall position="4 0 0" onClick={console.log}></RwWall>
          <RwWall position="4 0 4"></RwWall>
          <RwWall position="0 0 4"></RwWall>
          <RwWall position="0 0 0">
            <RwDoorHole id="holeA"></RwDoorHole>
            <RwDoorLink
              from="#holeA"
              to="#holeB"
              position="2.5 0 0"
            ></RwDoorLink>
          </RwWall>
        </RwRoom>
        <RwRoom position="0 0 -3">
          <RwWall position=" 1 0 -1" material="color:#787"></RwWall>
          <RwWall position=" 1 0  1" material="color:#877">
            <RwDoorHole id="holeB"></RwDoorHole>
          </RwWall>
          <RwWall position="-1 0  1" material="color:#878"></RwWall>
          <RwWall position="-1 0 -1" material="color:#778"></RwWall>
        </RwRoom>
      </Scene>
    </Layout>
  );
};

export default VRScene;
