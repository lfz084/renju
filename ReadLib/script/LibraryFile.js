(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    const BUFFERSIZE = 1024;

    const HEADER_SIZE = 20;

    const MAJOR_FILE_VERSION_INDEX = 8;
    const MINOR_FILE_VERSION_INDEX = 9;

    const MAJOR_FILE_VERSION = 3;
    const MINOR_FILE_VERSION = 4;

    const MAJOR_FILE_VERSION_H8 = 3;
    const MINOR_FILE_VERSION_OLD = 0;

    const CENTER = 0x78;

    const UINT_MAX = 4294967295;

    class LibraryFile {
        constructor() {
            this.m_file = new JFile();
            this.m_buffer = new Uint8Array(BUFFERSIZE);
            this.m_indexStart = 0;
            this.m_indexEnd = 0;
            this.m_mode = UINT_MAX;
            this.m_Version;
            this.m_MajorFileVersion = 0;
            this.m_MinorFileVersion = 0;

            //event
            this.onRead = undefined;
        }
    }

    LibraryFile.prototype.open = function(buffer, fileName, mode) {
        this.m_mode = mode || this.m_mode;
        return (this.m_file.open(buffer, fileName) != 0);
    };

    LibraryFile.prototype.get = function(node) {
        function Get_Node(node) {
            //console.log(`Get_Node`)
            node.setPos(new JPoint(0, 0));
            node.clearInformation();

            let data = new Uint8Array(2);

            let success = Get_Byte.call(this, data);
            //console.log(`success=${success}`)
            if (success) {
                //console.log(`data`)
                node.setPosInfo(data[0], data[1]);
                if (node.isExtension()) {
                    success = Get_Byte.call(this, data);
                    //console.log(`data`)
                    node.setExtendedInfo(data[0], data[1]);
                }
            }
            return success;
        };

        function Get_Byte(data = new Uint8Array(2)) {
            //console.log(`Get_Byte`)
            data[0] = 0;
            data[1] = 0;
            if (this.m_indexStart >= this.m_indexEnd) {
                //console.log("read")
                let nBytesRead = this.m_file.read(this.m_buffer, BUFFERSIZE);
                //console.log(`nBytesRead=${nBytesRead}`)
                //console.log(`[${this.m_buffer}]`)
                if (nBytesRead == 0) return false;

                this.m_indexEnd = nBytesRead;
                this.m_indexStart = 0;

                typeof this.onRead == "function" ?
                    this.m_file.onRead = this.onRead :
                    this.onRead = undefined;
            }
            //console.log(`{${[this.m_buffer[this.m_indexStart], this.m_buffer[this.m_indexStart+1]]}}`)
            data[0] = this.m_buffer[this.m_indexStart++];
            data[1] = this.m_buffer[this.m_indexStart++];
            //console.log(`{${data}}`)
            return true;
        }

        if (node.constructor.name == "MoveNode") {
            return Get_Node.call(this, node)
        }
        else if (node.constructor.name == "Uint8Array") {
            return Get_Byte.call(this, node)
        }
    }

    LibraryFile.prototype.close = function() {
        try {
            //this.write();
            this.m_file.close();
        }
        catch (err) {}
    };

    LibraryFile.prototype.seek = function(current) {
        this.m_file.seek(current);

        let nBytesRead = this.m_file.read(this.m_buffer, BUFFERSIZE);
        if (nBytesRead == 0) return false;

        this.m_indexEnd = nBytesRead;
        this.m_indexStart = 0;

        typeof this.onRead == "function" ?
            this.m_file.onRead = this.onRead :
            this.onRead = undefined;
    };

    LibraryFile.prototype.checkVersion = function() {
        let VersionOk = false;

        let header = new Uint8Array(HEADER_SIZE);
        header = [0xFF, "R".charCodeAt(), "e".charCodeAt(), "n".charCodeAt(), "L".charCodeAt(), "i".charCodeAt(), "b".charCodeAt(), 0xFF]
        //console.log(header)
        let buf = new Uint8Array(HEADER_SIZE);
        //console.log(buf)
        let dwRead;

        dwRead = this.m_file.read(buf, HEADER_SIZE);
        //console.log(dwRead)
        //console.log(buf)

        if (dwRead == HEADER_SIZE) {
            let HeaderMatch = true;

            for (let i = 0; i <= 7; i++) {
                if (buf[i] != header[i]) {
                    HeaderMatch = false;
                    //console.log(`HeaderMatch = false`)
                    break;
                }
            }

            if (HeaderMatch) {
                this.m_MajorFileVersion = buf[MAJOR_FILE_VERSION_INDEX];
                this.m_MinorFileVersion = buf[MINOR_FILE_VERSION_INDEX];

                if (100 * this.m_MajorFileVersion + this.m_MinorFileVersion <=
                    100 * MAJOR_FILE_VERSION + MINOR_FILE_VERSION) {
                    VersionOk = true;
                    //console.log(`VersionOk = true`)
                }
                else {

                }
            }
            else if (buf[0] == CENTER) {
                this.m_file.seekToBegin();
                VersionOk = true;
                //console.log(`VersionOk = true`)
            }
        }
        if (!VersionOk) {

        }
        console.log(`VersionOk=${VersionOk}`)
        return VersionOk;
    };

    LibraryFile.prototype.getVersion = function() {
        return this.m_Version;
    };


    //------------------------------------------------


    LibraryFile.prototype.current = function() {
        return this.m_file.m_current;
    };

    LibraryFile.prototype.end = function() {
        return this.m_file.m_end;
    };

    exports.LibraryFile = LibraryFile;
})))
