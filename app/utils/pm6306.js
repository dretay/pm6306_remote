const serialport = require('serialport')
const Readline = require('@serialport/parser-readline')
const Queue = require('promise-queue');

const delimiter = "\n";
const path = "/dev/ttyUSB0";

const SPECIAL_CMD_ESC = String.fromCharCode(27);
const SPECIAL_CMD_GO_LOCAL = `${SPECIAL_CMD_ESC}1`;
const SPECIAL_CMD_GO_REMOTE = `${SPECIAL_CMD_ESC}2`;
const SPECIAL_CMD_DEVICE_CLEAR = `${SPECIAL_CMD_ESC}4`;
const SPECIAL_CMD_LOCAL_LOCKOUT = `${SPECIAL_CMD_ESC}5`;
const SPECIAL_CMD_STATUS_BYTE = `${SPECIAL_CMD_ESC}7`;
const SPECIAL_CMD_DEVICE_TRIGGER = `${SPECIAL_CMD_ESC}8`;

const CLEAR_STATUS_CMD = "*CLS";
const RESET_CMD = "*RST";
const STANDARD_EVENT_ENABLE_CMD = "*ESE";
const READ_STATUS_BYTE_QUERY = "*STB?";
const IDENTIFICATION_CMD = "*IDN?";
const ERROR_QUERY_CMD = "err?";
const metadata = {
  LCR_METER_READY: false
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class PM6306 {
  constructor(){
    this.queue = new Queue(1,Infinity);
    this.port = null;
    this.parser = null;

    this.queue.add(()=> this.connect());
    this.queue.add(()=> this.send_command(SPECIAL_CMD_GO_REMOTE));//go remote
    this.queue.add(()=> this.send_command(RESET_CMD));//reset
    this.queue.add(()=> sleep(1000));//wait 1s for device to re-init
    this.queue.add(()=> this.send_command(CLEAR_STATUS_CMD));//clear status
    this.queue.add(()=> this.send_command(`${STANDARD_EVENT_ENABLE_CMD} 255`)); //clear status
    this.queue.add(()=> this.send_command(`${IDENTIFICATION_CMD}`)); //get identification string
    this.queue.add(()=>{
      metadata.LCR_METER_READY = true;
    });
  }
  async go_remote(){
    return this.send_message(SPECIAL_CMD_GO_REMOTE);
  }
  async go_local(){
    return this.send_message(SPECIAL_CMD_GO_LOCAL);
  }
  connect(){
    this.port = new serialport(path, {
      baudRate: 19200
    });
    this.parser = this.port.pipe(new Readline({ delimiter: delimiter }));
    return new Promise(resolve => {
      this.port.on('open', ()=>{
        resolve();
      });
    });
  }

  send_command (query){
    //check to see if command is a query
    let is_query = query.includes('?');

    // append terminator if not set
    if(query.substr(-1) !== delimiter){
      query += delimiter;
    }

    // console.log(`->${JSON.stringify(query)} (${is_query})`);
    this.port.write(query);
    if(is_query){
      return new Promise(resolve =>{
          this.parser.on('data', (data)=>{
            // console.log(`<-${JSON.stringify(data)}`);
            this.parser.removeAllListeners('data');
            resolve(data);
          });
      });
    }
    return Promise.resolve();
  }
  async _send_message(command){
    if(!metadata.LCR_METER_READY){
      throw "LCR METER NOT READY";
    }
    //send command
    let data = await this.send_command(command);

    //wait 100ms
    await sleep(100);
    //get the status byte
    let status = await this.send_command(READ_STATUS_BYTE_QUERY);

    if(status == 32){
      let error = await this.send_command(ERROR_QUERY_CMD);
      await this.send_command(CLEAR_STATUS_CMD);
      await this.send_command(`${STANDARD_EVENT_ENABLE_CMD} 255`)
      throw error;
    }
    return data;
  }
  send_message (command){
    return this.queue.add(()=> this._send_message(command).catch((error)=>{
      console.log(error);
    }));
  }
}

const pm6306 = new PM6306();
Object.freeze(pm6306);

export default pm6306;
