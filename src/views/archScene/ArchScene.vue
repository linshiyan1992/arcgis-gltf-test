<script setup>
import { ref, onMounted } from 'vue'
import { view, featureLayer, initScene } from '@/views/archScene/scene.js'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel'
import Camera from '@arcgis/core/Camera'
import WeatherViewModel from '@arcgis/core/widgets/Weather/WeatherViewModel'

const camera = new Camera({
  position: {
    spatialReference: { wkid: 4326 },
    x: 0.00030325632644135595,
    y: -0.000056653767458987374,
    z: 5
  },
  heading: 357.0456920611654,
  fov: 55,
  tilt: 91.37666196298129
})

const symbol = {
  type: 'point-3d',
  symbolLayers: [
    {
      type: 'object',
      resource: './tree-01.glb'
    }
  ]
}

const graphicsLayer = new GraphicsLayer({
  elevationInfo: {
    mode: 'relative-to-scene'
  }
})

const sketchVM = new SketchViewModel({
  layer: graphicsLayer,
  view
})

function addTree() {
  sketchVM.create('point')

  sketchVM.pointSymbol = {
    type: 'point-3d',
    symbolLayers: [
      {
        type: 'object',
        resource: {
          href: '/gltf/tree-01.glb'
        }
      }
    ]
  }

  sketchVM.on('create', (event) => {
    if (event.state === 'complete') {
      sketchVM.update(event.graphic)
    }
  })
}

async function copyCamera() {
  const { camera } = view
  const { fov, heading, position, tilt } = camera
  const message = {
    position,
    heading,
    fov,
    tilt
  }
  const blob = new Blob([JSON.stringify(message)], { type: 'text/plain' })
  const data = [new ClipboardItem({ ['text/plain']: blob })]
  await navigator.clipboard.write(data)
}

function addWater() {
  featureLayer.renderer = {
    type: 'simple',
    symbol: {
      type: 'polygon-3d',
      symbolLayers: [
        {
          type: 'water',
          waveDirection: 180,
          color: '#5975a3',
          waveStrength: 'moderate',
          waterbodySize: 'small'
        }
      ]
    }
  }
}

const weatherVM = new WeatherViewModel({
  view
})

function clearWeather() {
  weatherVM.setWeatherByType('sunny')
}

function cloudyWeather() {
  weatherVM.setWeatherByType('cloudy')
}

function rainnyWeather() {
  weatherVM.setWeatherByType('rainy')
}

function snowyWeather() {
  weatherVM.setWeatherByType('snowy')
}

function foggyWeather() {
  weatherVM.setWeatherByType('foggy')
}

onMounted(() => {
  initScene('sceneDiv')
  view.map.add(graphicsLayer)
  view.camera = camera
  view.ui.add('btn_add_tree', 'top-right')
  view.ui.add('btn_copy_camera', 'bottom-right')
  view.ui.add('btn_add_water', 'top-right')
  view.ui.add('btn_weather', 'top-right')
})
</script>

<template>
  <div id="sceneDiv"></div>
  <div id="btn_add_tree">
    <el-button @click="addTree">添加树木</el-button>
  </div>
  <div id="btn_copy_camera">
    <el-button @click="copyCamera">复制相机</el-button>
  </div>
  <div id="btn_add_water">
    <el-button @click="addWater">一键水面</el-button>
  </div>
  <div id="btn_weather">
    <el-text>天气面板</el-text>
    <el-button @click="clearWeather">我在垦丁天气晴</el-button>
    <div></div>
    <el-button @click="cloudyWeather">我的心情乌云密布</el-button>
    <div></div>
    <el-button @click="rainnyWeather">雨一直下，气氛不太融洽</el-button>
    <div></div>
    <el-button @click="snowyWeather">认真的雪</el-button>
    <div></div>
    <el-button @click="foggyWeather">迷雾</el-button>
  </div>
</template>

<style>
#sceneDiv {
  width: 100%;
  height: 100%;
}

#btn_weather {
  width: 230px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

#btn_weather .el-button {
  width: 200px;
  margin-bottom: 10px;
}
</style>
