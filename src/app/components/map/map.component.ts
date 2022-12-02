import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  coord: string;
  placeholder: string;

  latMarker: number;
  lngMarker: number;

  private map: L.Map;
  private centroid: L.LatLngExpression = [59.436962, 24.753574]; // Tallinn
  private markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  private layerGroup: L.LayerGroup;


  @Output() messageEventMap = new EventEmitter<string>();
  
  @Input('messageFromCoords') messageFromCoords: string = '';
  @Input('lngFromParent') lngFromParent: string = '';
  @Input('latFromParent') latFromParent: string = '';

  constructor() { }

  private initMap(): void {
    this.map = L.map('map', {
      //worldCopyJump: true,
      center: this.centroid,
      zoom: 5,
      zoomDelta: 1,
      zoomSnap: 0.25
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      noWrap: true,
      bounds: [
        [-90, -180],
        [90, 180]
      ],
      maxZoom: 20,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  
  }

  private initLayers() {
    this.layerGroup = L.layerGroup().addTo(this.map);

    this.map.on("click", e => {
      this.layerGroup.clearLayers();
      //console.log(e.latlng); // get the coordinates
      let coords = e.latlng;
      this.latMarker = e.latlng.lat;
      this.lngMarker = e.latlng.lng;
      L.marker([this.latMarker, this.lngMarker], this.markerIcon).addTo(this.layerGroup); // add the marker onclick
      
      this.emitCoordinates(coords);
    });
  }

  emitCoordinates(coords: L.LatLng) {
    // opaque it to JSON
    let msgJson = {
      lat: coords.lat,
      lng: coords.lng
    };
    
    this.messageEventMap.emit(JSON.stringify(msgJson));
  }

  ngOnInit(): void {
    this.initMap();
    this.initLayers();
  }

  setCoordinates(coord: any) {
    this.coord = coord.coord;
    this.placeholder = coord.placeholder;

    this.changeMarker(coord.coord, coord.placeholder);
  }

  changeMarker(newCoord: string, newPlaceholder: string) {
    this.layerGroup.clearLayers();
    let coord = parseFloat(newCoord);
    let placeholder = newPlaceholder;

    if (coord == NaN) {
      return;
    }
    if (placeholder == 'Latitude') {
      this.latMarker = coord;
    }
    if (placeholder == 'Longitude') {
      this.lngMarker = coord;
    }

    if ((this.latMarker || this.latMarker === 0) && (this.lngMarker || this.lngMarker === 0)) {
      let markerCoords = L.latLng(this.latMarker, this.lngMarker);
      let markerInfo = L.marker(markerCoords, this.markerIcon);
      markerInfo.addTo(this.layerGroup);

      //console.log(markerCoords);

      let markers: L.LatLngTuple[];
      markers = [];
      markers.push([markerCoords.lat, markerCoords.lng]);
      var bound = new L.LatLngBounds(markers);
      const zoomNow = this.map.getZoom();
      this.map.fitBounds(bound);
      this.map.setZoom(zoomNow);
    }
  }
}
