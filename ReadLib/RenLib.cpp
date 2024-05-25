
#define NULL 0

typedef unsigned char BYTE;
typedef unsigned int UINT; 
typedef unsigned short DWORD;
typedef char* CString;

extern UINT getBuffer(BYTE* pBuf, UINT size);
extern UINT grow(UINT pages);
extern void loading(UINT current, UINT end);
extern void memoryBound();
extern void outputSGFCache(char* buf, UINT len);

const UINT _ONE_KB = 1024; //1KB
const UINT _PAGE_SIZE = _ONE_KB*64; //64K
const UINT _ONE_MB = _ONE_KB*1024; //1MB
const UINT _IO_BUFFER_SIZE = _PAGE_SIZE;
const UINT _ERR_BUFFER_SIZE = _ONE_MB;
const UINT _LOG_BUFFER_SIZE = _ONE_MB;
const UINT _SGF_BUFFER_SIZE = _ONE_MB*2;
const UINT _COMMENT_BUFFER_SIZE = _ONE_MB*2;
const UINT _LIBFILE_BUFFER_SIZE = _ONE_MB;

char _empty0[_ONE_KB] = {0};

const char STR_STACK_FULL_0[] = "Stack Push(int nMove, MoveNode* pMove) Error: Stack full";
const char STR_STACK_EMPTY_0[] = "Stack Pop(int nMove, MoveNode* pMove) Error: Stack is Empty";
const char STR_STACK_FULL_1[] = "Stack Push(MoveNode* pMove) Error: Stack full";
const char STR_STACK_EMPTY_1[] = "Stack Pop(MoveNode* pMove) Error: Stack is Empty";
const char STR_STACK_FULL_2[] = "Stack Push(int nMove) Error: Stack full";
const char STR_STACK_EMPTY_2[] = "Stack Pop(int nMove) Error: Stack is Empty";
const char STR_MOVELIST_SETROOT_ERR[] = "MoveList SetRoot Error:";
const char STR_MOVELIST_FULL[] = "MoveList full";
const char STR_MOVELIST_SWAP_ERR[] = "MoveList Swap Error:";
const char STR_MOVELIST_GET_ERR[] = "MoveList Get Error:";
const char STR_MOVELIST_GETROOT_ERR[] = "MoveList GetRoot Error:";
const char STR_MOVELIST_CURRENT_ERR[] = "MoveList Current Error:";
const char STR_MOVELIST_SETINDEX_ERR[] = "MoveList SetIndex Error:";
const char STR_MOVELIST_DECREMENT_ERR[] = "MoveList Decrement Error:";
const char STR_CHECK_VERSION_ERR[] = "CheckVersion Error";
const char STR_NOT_RENLIB_FILE[] ="not RenLib File";
const char STR_SKIP_ROOT_NODE[] = "Skip root node";
const char STR_CHECKING_CODE_ERR[] = "ERROR checking code";
const char STR_ADDLIBRARY[] = "addLibrary...";
const char STR_SETROOT[] = "MoveList SetRoot";
const char STR_CHECKING_CODE[] = "checking code";
const char STR_GETVARIANT[] = "getVariant";
const char STR_SET_COMMENT[] = "set comment";
const char STR_SET_BOARDTXT[] = "set BoardTxt";
const char STR_ADDATTRIBUTES[] = "addAttributes";
const char STR_GET[] = "get";
const char STR_SETINFO[] = "setInfo";
const char ALPHA[] = "aabcdefghijklmnopqrstuvwxyz";

char MoveNode_Name_buffer[4] = {0};
char bit32_buffer[4] = {0};

UINT current_log_buffer = 0;
UINT current_err_buffer = 1;
UINT current_comment_buffer = 2;
UINT current_boardText_buffer = 3;
UINT current_data_buffer = 4;
UINT end_data_buffer = 5;

const UINT skip_data_pages = 32;
//const UINT start_data_buffer = _PAGE_SIZE * skip_data_pages; //skip 128 page

BYTE markStack[256] = {0};
char _empty1[_ONE_KB] = {0};

BYTE out_buffer[_IO_BUFFER_SIZE] = {0};
char _empty2[_ONE_KB] = {0};
BYTE in_buffer[_IO_BUFFER_SIZE] = {0};
char _empty3[_ONE_KB] = {0};

BYTE log_buffer[_LOG_BUFFER_SIZE] = {0}; //8M
char _empty4[_ONE_KB] = {0};
BYTE err_buffer[_ERR_BUFFER_SIZE] ={0}; // 1M
char _empty5[_ONE_KB] = {0};

BYTE sgf_buffer[_SGF_BUFFER_SIZE] = {0};
char _empty6[_ONE_KB] = {0};

BYTE libFile_buffer[_LIBFILE_BUFFER_SIZE] = {0};
char _empty7[_ONE_KB] = {0};

BYTE* comment_buffer;
BYTE* boardText_buffer;
BYTE* data_buffer; // Stack(1804) + MoveList(908) + LibraryFile(16) + all MoveNode......

//---------------158 page-----------------------

BYTE* getOutBuffer(){
    return out_buffer;
}

BYTE* getInBuffer(){
    return in_buffer;
}

//---------------log and error--------------------

void log(const char* message){
    UINT len = 0;
    if(current_log_buffer < _LOG_BUFFER_SIZE-1){
        log_buffer[current_log_buffer++] = 10;
        while(message[len] && (current_log_buffer < _LOG_BUFFER_SIZE-1)){
            log_buffer[current_log_buffer++] = message[len++];
        }
        log_buffer[current_log_buffer] = 0;
    }
}

void log(char* message){
    UINT len = 0;
    if(current_log_buffer < _LOG_BUFFER_SIZE-1){
        log_buffer[current_log_buffer++] = 10;
        while(message[len] && (current_log_buffer < _LOG_BUFFER_SIZE-1)){
            log_buffer[current_log_buffer++] = message[len++];
        }
        log_buffer[current_log_buffer] = 0;
    }
}

void onError(const char* message){
    UINT len = 0;
    if(current_err_buffer < _ERR_BUFFER_SIZE -1){
        err_buffer[current_err_buffer++] = 10;
        while(message[len] && (current_err_buffer < _ERR_BUFFER_SIZE -1)){
            err_buffer[current_err_buffer++] = message[len++];
        }
        err_buffer[current_err_buffer] = 0;
    }
    
    log(message);
}

BYTE* getLogBuffer(){
    return log_buffer;
}

BYTE* getErrorBuffer(){
    return err_buffer;
}
//----------------- comment buffer --------------------

BYTE* getCommentBuffer(){
    return comment_buffer;
}

//----------------- boardText buffer --------------------

BYTE* getBoardTextBuffer(){
    return boardText_buffer;
}

//----------------- data buffer --------------------

//UINT grow(UINT pages){
    //return pages;
//}

BYTE* getDataBuffer(){
    //return data_buffer + start_data_buffer;
    return data_buffer;
}

BYTE* newBuffer(UINT size){
    if(current_data_buffer + size > end_data_buffer){
        current_data_buffer = end_data_buffer;
    	return 0;
    }
    current_data_buffer += size;
    return &data_buffer[current_data_buffer-size];
}

//------------------ LibraryFile Buffer ---------------

BYTE* getLibFileBuffer(){
    return libFile_buffer;
}
//------------------- CPoint ------------------------

class CPoint
{
public:
    BYTE x;
    BYTE y;
private:
    const static char* alpha;
    const static char* mbArr;
    static char name[4];
public:
    CPoint():
    x(0),
    y(0)
    {
    }
    CPoint(unsigned char _x, unsigned char _y):
    x(_x),
    y(_y)
    {
    }
    char* getName(){
        name[0] = alpha[x-1];
           if(y<7){
               name[1] = mbArr[1];
               name[2] = mbArr[16-y-10];
               name[3] = 0;
           }
           else{
               name[1] = mbArr[16-y];
               name[2] = 0;
           }
        return name;
    }
    CPoint operator+(const CPoint& b){
        CPoint p;
        p.x = this->x + b.x;
        p.y = this->y + b.y;
        return p;
    }
    CPoint operator-(const CPoint& b){
        CPoint p;
        p.x = this->x - b.x;
        p.y = this->y - b.y;
        return p;
    }
    CPoint operator+=(const CPoint& b){
        this->x += b.x;
        this->y += b.y;
        return *this;
    }
    CPoint operator-=(const CPoint& b){
        this->x -= b.x;
        this->y -= b.y;
        return *this;
    }
    bool operator==(const CPoint& b){
        return this->x == b.x && this->y == b.y;
    }
    bool operator!=(const CPoint& b){
        return this->x != b.x || this->y != b.y;
    }
};

const char* CPoint::alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const char* CPoint::mbArr = "0123456789";
char CPoint::name[4] = {0,0,0,0};


//struct CPoint{
    //BYTE x;
    //BYTE y;
//};

CPoint* newCPoint(){
    CPoint* p = (CPoint*)newBuffer(sizeof(CPoint));
    p->x = 0;
    p->y = 0;
    return p;
}

CPoint* newCPoint(BYTE x, BYTE y){
    CPoint* p = (CPoint*)newBuffer(sizeof(CPoint));
    p->x = x;
    p->y = y;
    return p;
}

void test_newCPoint(UINT count){
    log("newCPoint");
    for(UINT i=0; i<count; i++){
        CPoint* p = newCPoint(i%16,i%16);
        //log(p->getName());
    }
    log("newCPoint end");
}

//----------------- MoveNode -----------------------------

    const int BOARD_TEXT = 0x000100;

    const int DOWN = 0x000080;
    const int RIGHT = 0x000040;
    const int OLD_COMMENT = 0x000020;
    const int MARK = 0x000010;
    const int COMMENT = 0x000008;
    const int START = 0x000004;
    const int NO_MOVE = 0x000002;
    const int EXTENSION = 0x000001;

    const int MASK = 0xFFFF3F;
    const CPoint NullPoint(0, 0);
    const BYTE NullIdx = 225;

    bool isValid(CPoint Pos) {
        return (Pos == NullPoint) ||
            (Pos.x >= 1 && Pos.x <= 15 && Pos.y >= 1 && Pos.y <= 15);
    }


    bool bit_is_one(int bit_value, UINT value) {
        return ((value & bit_value) != 0);
    }

    void set_bit(int bit_value, DWORD& value) {
        value |= bit_value;
    }

    void clear_bit(int bit_value, DWORD& value) {
        value &= ~bit_value;
    }
    
    bool isValidPoint(CPoint point) {
        return point.x >= 1 && point.x <= 15 && point.y >= 1 && point.y <= 15;
    }
    
    bool isEmpty(CString  str){
        return str==NULL || str[0]==0;
    }

    CPoint PosToPoint(BYTE pos) {
        if (pos == 0) {
            return CPoint(0, 0);
        }
        else {
            return CPoint(pos % 16, pos / 16 + 1);
        }
    }

    BYTE PointToPos(CPoint point) {
        if (isValidPoint(point)) {
            return 16 * (point.y - 1) + point.x;
        }
        else {
            return 0;
        }
    }
    
    CPoint IdxToPoint(BYTE idx) {
        if (idx == 225) {
            return CPoint(0, 0);
        }
        else {
            return CPoint(idx % 15 + 1, idx / 15 + 1);
        }
    }
    
    BYTE PointToIdx(CPoint point) {
        if (isValidPoint(point)) {
            return 15 * (point.y - 1) + point.x - 1;
        }
        else {
            return 225;
        }
    }
    
    BYTE PosToIdx(BYTE pos) {
        if (pos == 0) {
            return 225;
        }
        else {
            return pos % 16 - 1 + pos / 16 * 15;
        }
    }
    
    BYTE IdxToPos(BYTE idx) {
        if (idx == 225) {
            return 0;
        }
        else {
            return idx % 15 + 1 + idx / 15 * 16;
        }
    }
    
    class MoveNode
    {
        
    public:
        MoveNode():
        mIdx(NullIdx),
        mInfo(0),
        mDown(0),
        mRight(0),
        mBoardText(NULL)
        {
        }
        MoveNode(MoveNode& node):
        mIdx(node.mIdx),
        mInfo(node.mInfo),
        mDown(0),
        mRight(0),
        mBoardText(NULL)
        {
        }
        MoveNode(BYTE Idx):
        mIdx(Idx),
        mInfo(0),
        mDown(0),
        mRight(0),
        mBoardText(NULL)
        {
        }
    
        //virtual ~MoveNode();
  
        void setPosInfo(BYTE pos, BYTE info){
            mIdx  = PosToIdx(pos);
            mInfo = (mInfo & 0xFFFF00) | info;
        }
        void getPosInfo(BYTE& pos, BYTE& info){
            pos  = IdxToPos(mIdx);
            info = BYTE(mInfo & 0xFF);
        }
    
        void setExtendedInfo(BYTE info2, BYTE info1){
            mInfo &= 0xFF;
            mInfo |= ((info2 << 8) | info1) << 8;
        }
        void getExtendedInfo(BYTE& info2, BYTE& info1){
            UINT info = mInfo >> 8;
            info1 = BYTE(info & 0xFF);

            info >>= 8;
            info2 = BYTE(info & 0xFF);
        }
    
        //
        // Position
        //
        void setIdx(BYTE idx){
            mIdx = idx;
            setIsMove(true);
        }
        BYTE getIdx(){
            return mIdx;
        }
        char* getName(){
            return IdxToPoint(mIdx).getName();
        }
    
        //
        // Information
        //
        void clearInformation(){
            mInfo = 0;
        }
        bool isInformation(){
            return (mInfo & MASK) != 0;
        }
    
        bool isDown() {
            return isValue(DOWN);
        }
        void setIsDown(bool value){
            setIsValue(value, DOWN);
        }
    
        bool isRight() {
            return isValue(RIGHT);
        }
        void setIsRight(bool value){
            setIsValue(value, RIGHT);
        }
    
        bool isOldComment() {
            return isValue(OLD_COMMENT);
        }
        bool isNewComment() {
            return isValue(COMMENT);
        }
    
        bool isMark() {
            return isValue(MARK);
        }
        void setIsMark(bool value){
            setIsValue(value, MARK);
        }
    
        bool isStart() {
            return isValue(START);
        }
        void setIsStart(bool value){
            setIsValue(value, START);
        }
    
        bool isMove() {
            return !isValue(NO_MOVE);
        }
        bool isPassMove() {
            bool result = false;
            if (isMove()){
                result = (mIdx == NullIdx);
            }
            return result;
        }
        void setIsMove(bool value){
            setIsValue(!value, NO_MOVE);
        }
    
        bool isExtension() {
            return isValue(EXTENSION);
        }
        void setIsExtension(bool value){
            setIsValue(value, EXTENSION);
        }
    
        //
        // Instance data
        //
        void setDown(MoveNode* node){
            mDown = node;
        }
        MoveNode* getDown() {
            return mDown;
        }
    
        void setRight(MoveNode* node){
            mRight = node;
        }
        MoveNode* getRight() {
            return mRight;
        }
    
        bool isOneLineComment() {
            return false;
        }
        void setOneLineComment(CString comment){
            //mOneLineComment = comment;
            setIsNewComment(isOneLineComment());
        }
        CString getOneLineComment() {
            return NULL;
        }
    
        bool isBoardText() {
            return isValue(BOARD_TEXT);
        }
        void setBoardText(CString text){
            mBoardText = text;
            setIsBoardText(!isEmpty(mBoardText));
        }
        CString getBoardText() {
            return (CString)&mBoardText;
        }
    
    private:
        void setIsNewComment(bool value){
            setIsValue(value, COMMENT);
            setIsValue(false, OLD_COMMENT);
        }
        void setIsBoardText(bool value){
            setIsValue(value, BOARD_TEXT);
            checkExtension();
        }
        void checkExtension(){
            setIsExtension((mInfo & 0xFFFF00) != 0);
        }
        bool isValue(UINT bitValue) {
            return bit_is_one(bitValue, mInfo);
        }
        void setIsValue(bool value, UINT bitValue){
            if (value){
                set_bit(bitValue, mInfo);
            }
            else{
                clear_bit(bitValue, mInfo);
            }
        }
    
    public:
        BYTE        mIdx;              // position, idx 
        
        BYTE        m;
        
        DWORD        mInfo;             // information
    
        //CString        mOneLineComment;   // one line comment
        CString        mBoardText;        // board text
    
        MoveNode*    mDown;             // next level
        MoveNode*    mRight;            // same level
    };
    

    MoveNode* newMoveNode(){
        MoveNode* node = (MoveNode*)newBuffer(sizeof(MoveNode));
        return node;
    }
    
    MoveNode* newMoveNode(MoveNode& _node){
        MoveNode* node = (MoveNode*)newBuffer(sizeof(MoveNode));
        node->mIdx = _node.mIdx;
        node->mInfo = _node.mInfo;
        return node;
    }
    
    MoveNode* newMoveNode(BYTE Idx){
        MoveNode* node = (MoveNode*)newBuffer(sizeof(MoveNode));
        node->mIdx = Idx;
        return node;
    }
    
    void test_newMoveNode(UINT count){
        log("newMoveNode");
        for(UINT i=0; i<count; i++){
            MoveNode* node = newMoveNode(i);
            node = newMoveNode(*node);
        }
        log("newMoveNode end");
    }

//--------------------------- Stack -----------------------

class Stack  
{
public:
    Stack(){
        ClearAll();
    }
    
    void ClearAll(){
        m_nIndex = 0;
        for (int i=0; i < SIZE; i++){
            m_Stack[i].nMove = 0;
            m_Stack[i].pMove = 0;
        }
    }

    bool IsEmpty(){
        return (m_nIndex == 0);
    }

    void Push(int nMove, MoveNode*  pMove){
        /*if (m_nIndex >= SIZE){
            onError(STR_STACK_FULL_0);
        }*/

        m_Stack[m_nIndex].nMove = nMove;
        m_Stack[m_nIndex].pMove = pMove;
        m_nIndex++;
    }
    void Pop(int& nMove, MoveNode*& pMove){
        /*if(m_nIndex <= 0){
            onError(STR_STACK_EMPTY_0);
        }*/
    
        m_nIndex--;
        nMove = m_Stack[m_nIndex].nMove;
        pMove = m_Stack[m_nIndex].pMove;
    }

    void Push(MoveNode*  pMove){
        /*if (m_nIndex >= SIZE){
            onError(STR_STACK_FULL_1);
        }*/

        m_Stack[m_nIndex].nMove = 0;
        m_Stack[m_nIndex].pMove = pMove;
        m_nIndex++;
    }
    void Pop(MoveNode*& pMove){
        /*if(m_nIndex <= 0){
            onError(STR_STACK_EMPTY_1);
        }*/

        m_nIndex--;
        pMove = m_Stack[m_nIndex].pMove;
    }

    void Push(int nMove){
        /*if (m_nIndex >= SIZE){
               onError(STR_STACK_FULL_2);
        }*/

        m_Stack[m_nIndex].nMove = nMove;
        m_Stack[m_nIndex].pMove = NULL;

        m_nIndex++;
    }
    void Pop(int& nMove){
        /*if(m_nIndex <= 0){
            onError(STR_STACK_EMPTY_2);
        }*/

        m_nIndex--;
        nMove = m_Stack[m_nIndex].nMove;
    }
    int Index(){
        return m_nIndex;
    }

private:
    struct Item
    {
        int       nMove;
        MoveNode* pMove;
    };
    enum { SIZE = 225 };
    Item    m_Stack [SIZE];
    int        m_nIndex;
};


//---------------------- MoveList -----------------------


class MoveList  
{
public:
    MoveList(){
        ClearAll();
    }

    bool IsEmpty() {
        return m_nIndex == -1;
    }
    bool IsFull(){
        return m_nIndex == MAXINDEX;
    }

    void SetRoot(MoveNode* pMove){
        /*if(!IsEmpty()){
            onError(STR_MOVELIST_SETROOT_ERR);
        }*/
        Add(pMove);
        //m_List[++m_nIndex] = pMove;
    }
    void Add(MoveNode* pMove){
        /*if(m_nIndex >= MAXINDEX){
            onError(STR_MOVELIST_FULL);
        }*/
        m_List[++m_nIndex] = pMove;
    }
    void Swap(int nIndex1, int nIndex2){
        /*if(nIndex1 < 1 || nIndex1 > m_nIndex || nIndex2 < 1 || nIndex2 > m_nIndex){
            onError(STR_MOVELIST_SWAP_ERR);
        }*/
        MoveNode* temp  = m_List[nIndex1];
        m_List[nIndex1] = m_List[nIndex2];
        m_List[nIndex2] = temp;
    }

    MoveNode* Get(int nIndex) {
        /*if(IsEmpty() ||
        nIndex < 0 || nIndex > MAXINDEX){
            onError(STR_MOVELIST_GET_ERR);
        }*/
        return m_List[nIndex];
    }
    MoveNode* GetRoot() {
        /*if(IsEmpty()){
            onError(STR_MOVELIST_GETROOT_ERR);
        }*/
        return m_List[0];
    }
    MoveNode* Current() {
        /*if(IsEmpty()){
            onError(STR_MOVELIST_CURRENT_ERR);
        }*/
        return m_List[m_nIndex];
    }

    MoveNode* Next(){
        if (m_nIndex < MAXINDEX){
            return m_List[m_nIndex + 1];
        }
        else{
            return 0;
        }
    }
    MoveNode* Previous(){
        if (m_nIndex > 0){
            return m_List[m_nIndex - 1];
        }
        else{
            return 0;
        }
    }

    void SetIndex(int nIndex){
        /*if(nIndex < 0 || nIndex > m_nIndex){
            onError(STR_MOVELIST_SETINDEX_ERR);
        }*/
        m_nIndex = nIndex;
    }
    void SetRootIndex(){
        SetIndex(0);
    }
    void Decrement(){
        /*if(m_nIndex <= 0){
            onError(STR_MOVELIST_DECREMENT_ERR);
        }*/
        m_nIndex--;
    }
    int  Index(){
        return m_nIndex;
    }

    void ClearAll(){
        for (int i=0; i <= MAXINDEX; i++){
            m_List[i] = 0;
        }
    
        m_nIndex = -1;
    }
    void ClearEnd(){
        for (int i = m_nIndex + 1; i <= MAXINDEX; i++){
            m_List[i] = 0;
        }
    }

private:
    enum{ MAXINDEX = 225 };
    MoveNode*    m_List [MAXINDEX + 1]; // 1 based
    int            m_nIndex;
};

//-----------------------------------------------------

const int HEADER_SIZE = 20;

const int MAJOR_FILE_VERSION_INDEX = 8;
const int MINOR_FILE_VERSION_INDEX = 9;

const int MAJOR_FILE_VERSION = 3;
const int MINOR_FILE_VERSION = 4;

const int MAJOR_FILE_VERSION_H8  = 3;
const int MINOR_FILE_VERSION_OLD = 0;

const int CENTER = 0x78;


class LibraryFile  
{
public:
    LibraryFile():
    m_indexStart(0),
    m_indexEnd(0),
    m_MajorFileVersion(0),
    m_MinorFileVersion(0)
    {
    }

    int Open(int size){
        m_indexStart = 0;
        m_indexEnd = 0;
        m_MajorFileVersion = 0;
        m_MinorFileVersion = 0;
        return size;
    }

    bool Get(BYTE& data1, BYTE& data2){
        data1 = 0;
        data2 = 0;
        //log(STR_GET);
        if (m_indexStart >= m_indexEnd){
            UINT nBytesRead = getBuffer(libFile_buffer, BUFFERSIZE);

            if (nBytesRead == 0){
                return false;
            }

            m_indexEnd   = nBytesRead - 1;
            m_indexStart = 0;
        }

        data1 = libFile_buffer[m_indexStart++];
        data2 = libFile_buffer[m_indexStart++];

        return true;
    }
    bool Get(MoveNode& node){
        node.setIdx(NullIdx);
        node.clearInformation();

        BYTE data1;
        BYTE data2;

        bool success = Get(data1, data2);
    
        if (success){
        node.setPosInfo(data1, data2);

            if (node.isExtension()){
                success = Get(data1, data2);
                node.setExtendedInfo(data1, data2);
            }
        }
        return success;
    }
    bool CheckVersion(){
        bool VersionOk = false;

    //                            0     1    2    3    4    5    6    7
        BYTE header[HEADER_SIZE] = { 0xFF, 'R', 'e', 'n', 'L', 'i', 'b', 0xFF };
        UINT dwRead;

        dwRead = getBuffer(libFile_buffer, HEADER_SIZE);
        log(STR_CHECKING_CODE);
        if (dwRead == HEADER_SIZE){
            bool HeaderMatch = true;

            for (int i=0; i<=7; i++){
                if (libFile_buffer[i] != header[i]){
                    //cout << "HeaderMatch = false" << endl;
                    HeaderMatch = false;
                    i = 8;
                }
            }

            if (HeaderMatch){
                m_MajorFileVersion = libFile_buffer[MAJOR_FILE_VERSION_INDEX];
                m_MinorFileVersion = libFile_buffer[MINOR_FILE_VERSION_INDEX];

                if (100 * m_MajorFileVersion + m_MinorFileVersion <=
                100 * MAJOR_FILE_VERSION + MINOR_FILE_VERSION)
                {
                    VersionOk = true;
                }
            }
            else if (libFile_buffer[0] == CENTER){
                VersionOk = true;
            }
        }
        /*
        if (!VersionOk){
               onError(STR_CHECK_VERSION_ERR);
        }
        */
        return VersionOk;
    }

    void Close(){
        m_indexStart = 0;
        m_indexEnd = 0;
        m_MajorFileVersion = 0;
        m_MinorFileVersion = 0;
    }

    CString GetVersion() {
        return m_Version;
    }

private:
    enum { BUFFERSIZE = _LIBFILE_BUFFER_SIZE};

    int     m_indexStart;
    int     m_indexEnd;
    CString m_Version;
    BYTE    m_MajorFileVersion;
    BYTE    m_MinorFileVersion;
};

//----------------- TextPages  ---------------------------

const UINT TEXTPAGE_SIZE = 1024;

struct TextPage
{
    MoveNode* pMoveNode;
    char text[1020];
};

class TextPages
{
    public:
        TextPages(BYTE* buffer, UINT buffer_size) 
        {
            page_start = (TextPage*)buffer;
            page_end = (TextPage*)(buffer+buffer_size);
            m_index = 0;
        }
        
        TextPage* getTextPage()
        {
            TextPage* page = page_start + m_index;
            if (page < page_end) 
            {
                m_index++;
                return page;
            }
            return 0;
        }
        
        TextPage* findTextPage(MoveNode* pNode)
        {
            int i = 0;
            TextPage* st_page = page_start;
            TextPage* ed_page = page_start + (m_index-1);
            TextPage* c_page = st_page + (ed_page - st_page)/2;
            while(st_page <= ed_page && i++ < 32) {
                if (c_page->pMoveNode == pNode) {
                    return c_page;
                }
                else if (c_page->pMoveNode > pNode) {
                    ed_page = c_page - 1;
                    c_page = st_page + (ed_page - st_page)/2;
                }
                else {
                    st_page = c_page + 1;
                    c_page = st_page + (ed_page - st_page)/2;
                }
            }
            return 0;
        }
    public:
        TextPage* page_start;
        TextPage* page_end;
        UINT m_index;
};

//--------------------- filterBoard ---------------
/*
class FilterBoard
{
    public:
        FilterBoard(BYTE* path, DWORD len)
        {
            clear();
            setPosition(path, len);
        }
        void clear()
        {
            for(DWORD i = 0; i < 228; i++)
            {
                position[i] = 0;
                positionB[i] = 0;
            }
            movesCount = 0;
        }
        void setPosition(BYTE* path, DWORD len)
        {
            for(DWORD i = 0; i < len; i++)
            {
                position[i] = path[i];
            }
        }
        void reset()
        {
            for(DWORD i = 0; i < 228; i++)
            {
                positionB[i] = 0;
            }
            movesCount = 0;
        }
        DWORD move(DWORD idx, BYTE color) 
        {
            if (position[idx] == color && this->positionB[idx] == 0) {
                this->positionB[idx] = color;
                return ++this->movesCount;
            }
            else {
                return 0;
            }
        }
        DWORD back(DWORD idx)
        {
            if (this->positionB[idx]) {
                this->positionB[idx] = 0;
                return this->movesCount--;
            }
            else {
                return 0;
            }
        }
    public:
        BYTE position[228];
        BYTE positionB[228];
        DWORD movesCount;
};
*/
//--------------------- Doc -------------------------
    
    MoveNode* rootMoveNode = 0;
    Stack* m_Stack = 0;
    MoveList* m_MoveList = 0;
    LibraryFile* m_file = 0;
    TextPages* commentPages = 0;

    int msb(BYTE ch){
        return (ch & 0x80);
    }
    
    bool LessThan(CPoint Left, CPoint Right) {
        return PointToPos(Left) < PointToPos(Right);
    }

    void readOldComment(CString pStrOneLine){
        BYTE data1;
        BYTE data2;
        pStrOneLine[0] = 0;
        do {
            m_file->Get(data1, data2);
        }while(msb(data1)==0 && msb(data2)==0);
        
    }
    
    UINT readNewComment(CString pStrOneLine){
        BYTE data1;
        BYTE data2;
        UINT len = 0;
        
        do {
            m_file->Get(data1, data2);
            if(len < 1018) {
            pStrOneLine[len++] = data1;
            pStrOneLine[len++] = data2;
            }
        }while(data1 && data2);
        pStrOneLine[len + 1] = 0;
        pStrOneLine[len + 2] = 0;
        return len;
    }
    
    UINT readBoardText(CString pStrBoardText){
        BYTE data1;
        BYTE data2;
        UINT len = 0;

        do {
            m_file->Get(data1, data2);
            if(len < 4) {
            pStrBoardText[len++] = data1;
            pStrBoardText[len++] = data2;
            }
            
        }while(data1 && data2);
        
        return len;
    }
    
    void addMove(MoveNode* pMove, MoveNode* pNewMove){
        if (pMove->mDown == 0) {
            pMove->setDown(pNewMove);
        }
        else {
            if (pNewMove->mIdx < pMove->mDown->mIdx) {
                pNewMove->setRight(pMove->mDown);
                pMove->setDown(pNewMove);
            }
            else {
                pMove = pMove->mDown;
                bool br = false;
                while (!br) {
                    if (pMove->mRight == 0) {
                        pMove->setRight(pNewMove);
                        br = true;
                    }
                    else if (pNewMove->mIdx < pMove->mRight->mIdx) {
                        pNewMove->setRight(pMove->mRight);
                        pMove->setRight(pNewMove);
                        br = true;
                    }
                    pMove = pMove->mRight;
                }
            }
        }
    }
    
    void addAttributes(MoveNode* pMove, MoveNode* pFrom, bool& bMark, bool& bMove, bool& bStart){
        bMark = false;
        bMove = false;
        bStart = false;
    
        if (pFrom->isMark() && !pMove->isMark()) {
            bMark = true;
            pMove->setIsMark(bMark);
        }
    
        if (pFrom->isMove() && !pMove->isMove()) {
            bMove = true;
            pMove->setIsMove(bMove);
        }
    
        if (pFrom->isStart() && !pMove->isStart()) {
            bStart = true;
            pMove->setIsStart(bStart);
        }
    }
    
    MoveNode* getVariant(MoveNode* pMove, BYTE  Idx){
        if (pMove->mDown) { //RenLib 3.6 标准
            pMove = pMove->mDown;
    
            if (pMove->mIdx == Idx) return pMove;
    
            while (pMove->mRight) {
                pMove = pMove->mRight;
                if (pMove->mIdx == Idx) return pMove;
            }
        }
            
        return 0;
    }
    
    UINT getAutoMove() {
        MoveNode* pMove = rootMoveNode;
        CPoint* pPos = (CPoint*)out_buffer;
        UINT len = 0;
        while (pMove->mDown) {
            pMove = pMove->mDown;
            if (pMove->mRight==0) {
                pPos[len++] = IdxToPoint(pMove->mIdx);
            }
            else {
                break;
            }
        }
        return len;
    }

//-------------------- get Branch -------------------- 

struct Item{
    int nMove;
    MoveNode* pMove;
};

struct Node{
    CPoint mPos;
    char* txt;
    UINT color;
};

struct InnerHTMLInfo{
    char* innerHTML;
    int depth;
};

void findNode(MoveNode*& pMove, CPoint pos) {
    while (pMove) {
        if (IdxToPoint(pMove->mIdx) == pos) {
            break;
        }
        else if (pMove->mRight) {
            pMove = pMove->mRight;
        }
        else {
            pMove = 0;
            break;
        }
    }
}

void searchInnerHTMLInfo(CPoint* posArr, UINT len) {
    MoveNode* pMove = rootMoveNode;
    CPoint* pPos = (CPoint*)in_buffer;
    struct InnerHTMLInfo* innerHTMLInfo = (struct InnerHTMLInfo*)out_buffer;
    innerHTMLInfo->innerHTML = NULL;//pMove->mOneLineComment;
    innerHTMLInfo->depth =  -1;
    
    for (UINT i = 0; i < len; i++) {
        if (pMove->mDown) {
            pMove = pMove->mDown;
            findNode(pMove, pPos[i]);
            if (pMove){
                if(pMove->isNewComment() && i == len - 1) {
                    TextPage* page = commentPages->findTextPage(pMove);
                    if (page) {
                        innerHTMLInfo->innerHTML = page->text;
                        innerHTMLInfo->depth = i;
                    }
                }
            }
            else {
                break;
           }
        }
        else {
            break;
        }
    }
}

int indexOf(CPoint Pos, CPoint* posArr, int len){
    for(int i=0; i<len; i++){
        if(posArr[i] == Pos) return i;
    }
    return -1;
}

int indexOfNode(CPoint Pos, struct Node* nodes, int len){
    for(int i=0; i<len; i++){
        if(nodes[i].mPos == Pos) return i;
    }
    return -1;
}
/*
void addBranch(branch) {
    let current = nodes[branch.idx],
        branchsInfo = (branch.indexOf + 1 & 1) + 1; //last move color

    if (undefined == current) {
        current = nodes[branch.idx] = new Branchs();
    }

    if (0 == (current.branchsInfo & branchsInfo) || 
        branch.color == "black" || 
        (current.branchs[branchsInfo - 1] && current.branchs[branchsInfo - 1].isJoinNode))
    {
        current.branchsInfo |= branchsInfo;
        current.branchs[branchsInfo - 1] = branch;
        3 == current.branchsInfo && (current.boardText = DEFAULT_BOARD_TXT[3]);
    }
}

void addChildBranchs(current, currentPath, nMatch) {
    let childNodes = current.getChilds(),
        passNode,
        color = this->nMatch == nMatch ? checkPath(path, currentPath) ? "black" : "#556B2F" : "#008000";

    childNodes.length && childNodes[childNodes.length - 1].idx == 225 && (passNode = childNodes.pop());
    childNodes.map(cur => {
        let idx = normalizeIdx(cur.idx, nMatch, this->size),
            path = currentPath.concat([idx]),
            branch = new Branch({
                idx: idx,
                nMatch: nMatch,
                color: color,
                boardText: cur.boardText,
                comment: cur.comment,
                path: path,
            });
            addBranch(branch);
                //console.log(`this->nMatch: ${this->nMatch}\nnMatch: ${nMatch}\n`);
    });
    passNode && passNode.getChilds().map(cur => {
        let idx = normalizeIdx(cur.idx, nMatch, this->size),
            path = currentPath.concat([225, idx]),
            branch = new Branch({
                idx: idx,
                nMatch: nMatch,
                color: color,
                boardText: cur.boardText,
                comment: cur.comment,
                path: path,
            });
            addBranch(branch);
    });
}

void getBranchNodes(BYTE* path, DWORD len){
    struct Node* Nodes = (struct Node*)&out_buffer[4];
    struct Node* pNode = Nodes;
    
    DWORD movesLen = 0;
        
    MoveList* moveList = m_MoveList;
    Stack* stack = m_Stack;
    MoveNode* downNode = NULL;
    MoveNode* rightNode = NULL;
    MoveNode* current = moveList->GetRoot();
    FilterBoard* filterBoard = (FilterBoard*)&in_buffer[1024];
    MoveNode* jointNode = NULL;
        
    moveList.SetRootIndex();
    for(DWORD i = 0; i < len; i++) {
        if (path[i] < 225) {
            movesLen++;
        }
    }
        
    if (len == 0) {
        addChildBranchs
    }
    else {
        current = current->mDown;
    }
        
        while (current) {
            bool isBack = false;
            BYTE idx = current->mIdx;
            
            rightNode = current->mRight;
            downNode = current->mDown;
            if (rightNode) {
                stack->Push(moveList.Index(), rightNode);
            }
            moveList->Add(idx);
            
            BYTE color = (moveList.Index() - 1 & 1) + 1;
            DWORD rt = filterBoard->move(idx, color);
            
            if (rt || idx == 225) {
                if (rt == movesLen) {
                    if(jointNode) {
                        let branch = new Branch({
                            idx: normalizeIdx(jointNode.node.idx, nMatch, this->size),
                            nMatch: nMatch,
                            color: "#685D8B", //"#483D8B"
                            boardText: DEFAULT_BOARD_TXT[(jointNode.len - 1 & 1) + 1],
                            path: currentPath,
                            indexOf: jointNode.len,
                            isJoinNode: true
                        });
                        addBranch(branch);
                    }
                    else {
                        addChildBranchs.call(this, current, currentPath, nMatch);
                    }
                    isBack = true;
                }
                else {
                    if (downNode) current = downNode;
                    else isBack = true;
                }
            }
            else if (!jointNode) {
                jointNode = { node: current, len: moveList.length };
                    if (downNode) current = downNode;
                    else isBack = true;
            }
            else {
                isBack = true;
            }
            
            if (isBack) {
                int len;
                if (stack->Index()) {
                    stack->Pop(len, current);
                }
                else {
                    current = NULL;
                    len = 0;
                }
                for (int i = moveList->Index(); i > len; i--) {
                    filterBoard->back(moveList.current()->mIdx);
                    moveList->Decrement();
                }
                if (jointNode && jointNode.len > moveList->Index()) jointNode = NULL;
            }
        }
        
        nodes = nodes.filter(cur => !!cur);
        return nodes;
}
*/

void getBranchNodes(CPoint* posArr, int len){
    bool done = false;
    int* count = (int*)out_buffer;
    *count = 0;
    struct Node* Nodes = (struct Node*)&out_buffer[4];
    struct Node* pNode = Nodes;
    MoveNode* pMove = rootMoveNode->mDown;
    MoveNode** moveList = (MoveNode**)&in_buffer[1024];
    int listLength = 0;
    struct Item* stack = (struct Item*)&in_buffer[2048];
    int stackLength = 0;
    struct Item jointNode = {0,0};
    while(!done){
        
        if(pMove){
            int idx = indexOf(IdxToPoint(pMove->mIdx), posArr, len);
            moveList[listLength++] = pMove;
    
            //if(listLength <= len + 1){
                if(pMove->mRight){
                    stack[stackLength].pMove = pMove->mRight;
                    stack[stackLength++].nMove = listLength;
                }
                
                if(listLength <= len){
                    if(idx > -1 && idx%2 == (listLength-1)%2){
                        pMove = pMove->mDown;
                    }
                    else if(idx == -1 && jointNode.pMove == 0 && listLength%2 == (len+1)%2){
                        jointNode.nMove = listLength;
                        jointNode.pMove = pMove;
                        pMove = pMove->mDown;
                    }
                    else{
                        pMove = 0;
                    }
                }
                else if(listLength == len + 1){
                    if(idx>=0){
                        int idxNode = indexOfNode(IdxToPoint(jointNode.pMove->mIdx), Nodes, *count);
                        if(idxNode>-1){
                            if(Nodes[idxNode].txt==0){
                                Nodes[idxNode].txt = pMove->getBoardText();
                                Nodes[idxNode].color = 0;
                            }
                        }
                        else{
                            pNode->mPos = IdxToPoint(jointNode.pMove->mIdx);
                            pNode->txt = pMove->getBoardText();
                            pNode->color = 0;
                            pNode++;
                            (*count)++;
                        }
                    }
                    else if(idx==-1 && jointNode.pMove==0){
                        int idxNode = indexOfNode(IdxToPoint(pMove->mIdx), Nodes, *count);
                        if(idxNode>-1){
                            if(Nodes[idxNode].txt==0){
                                Nodes[idxNode].txt = pMove->getBoardText();
                                Nodes[idxNode].color = 0;
                            }
                        }
                        else{
                            pNode->mPos = IdxToPoint(pMove->mIdx);
                            pNode->txt = pMove->getBoardText();
                            pNode->color = 0;
                            pNode++;
                            (*count)++;
                        }
                    }
                    pMove = 0;
                }
            //}
            //else{
                //pMove = 0;
            //}
        }
        else if(stackLength>0){
            pMove = stack[--stackLength].pMove;
            listLength = stack[stackLength].nMove - 1;
            if(jointNode.pMove && jointNode.nMove > listLength){
                jointNode.nMove = 0;
                jointNode.pMove = 0;
            }
        }
        else{
            done = true;
        }
        
    }
}

//-------------------- RenLib Tree ------------------

UINT m_MoveNode_count = 0;

UINT* getMoveNodeCountBuffer(){
    return &m_MoveNode_count;
}

bool checkVersion(){
    if(m_file->CheckVersion()){
        m_MoveList->ClearAll();
        m_Stack->ClearAll();
        commentPages->page_start = (TextPage*)comment_buffer;
        commentPages->page_end = (TextPage*)(comment_buffer+_COMMENT_BUFFER_SIZE);
        commentPages->m_index = 0;
            
        MoveNode* pCurrentMove = 0;
        
        if (m_MoveList->IsEmpty()) {
            pCurrentMove = (MoveNode*)newBuffer(sizeof(MoveNode));
            pCurrentMove->mIdx = NullIdx;
            m_MoveList->SetRoot(pCurrentMove);
            rootMoveNode = pCurrentMove;
        }
        else {
            pCurrentMove = m_MoveList->GetRoot();
            m_MoveList->SetRootIndex();
            rootMoveNode = pCurrentMove;
        }
        return true;
    }
    else{
        return false;
    }
}

UINT loadAllMoveNode(){
    m_MoveNode_count = 0;
    MoveNode* next = (MoveNode*)newBuffer(sizeof(MoveNode));
    
    //log("next = newMoveNode()");
    int len = 0;
    char* str;
    while(m_file->Get(*next)){
        m_MoveNode_count++;
        if (next->isOldComment()){
            //log("readOldComment");
            str = (char*)in_buffer;
            readOldComment(str);
            next->mInfo &= ~(OLD_COMMENT | COMMENT);
        }
            
        if(next->isNewComment()) {
            //log("readNewComment");
            TextPage* page = commentPages->getTextPage();
            if (page) {
                page->pMoveNode = next;
                str = page->text;
            }
            else {
                str =  (char*)in_buffer;
                next->mInfo &= ~(OLD_COMMENT | COMMENT);
            }
            len = readNewComment(str);
        }
            
        if (next->isBoardText()) {
            //log("readBoardText");
            str = (char*)in_buffer; // (char*)&boardText_buffer[current_boardText_buffer];
            len = readBoardText((CString)&(next->mBoardText));
        }
        
        next = (MoveNode*)newBuffer(sizeof(MoveNode));
        if (next == 0) {
            memoryBound();
            break;
        }
    }

    return m_MoveNode_count;
}

bool createRenjuTree(){
    bool bMark = false;
    bool bMove = false;
    bool bStart = false;
    MoveNode* pCurrentMove = rootMoveNode;
    MoveNode* pNextMove = 0;
    MoveNode* next = pCurrentMove;
    
    m_MoveList->SetRootIndex();
    
    for(UINT i=0; i<m_MoveNode_count; i++){
        next++;
        if(i%300000==0) loading(i, m_MoveNode_count);
        
        BYTE idx = next->mIdx;
                    
        if (idx == NullIdx) {
            //log(STR_SKIP_ROOT_NODE);
        }
        else if (idx < 0 || idx > 225) {
            //log(STR_CHECKING_CODE_ERR);
            return false;
        }
        else {
            //log(STR_GETVARIANT);
            pNextMove = getVariant(pCurrentMove, next->mIdx);
            if (pNextMove) {
                pCurrentMove = pNextMove;
                //if(pCurrentMove->mOneLineComment==0) pCurrentMove->mOneLineComment = next->mOneLineComment;
                if(pCurrentMove->mBoardText==0) pCurrentMove->mBoardText =  next->mBoardText;
                addAttributes(pCurrentMove, next, bMark, bMove, bStart);
            }
            else {
                pNextMove = next;
                addMove(pCurrentMove, pNextMove);
                pCurrentMove = pNextMove;
            }
            //log(STR_GETVARIANT);
            m_MoveList->Add(pCurrentMove);
        }
        
        if (next->isDown()) {
            if(m_MoveList->Index() > 0) m_Stack->Push(m_MoveList->Index());
        }
                    
        if (next->isRight()) {
            if (!m_Stack->IsEmpty()) {
                int nMove = 0;
                m_Stack->Pop(nMove);
                m_MoveList->SetIndex(nMove - 1);
                pCurrentMove = m_MoveList->Current();
            }
            else{
                m_MoveList->SetRootIndex();
                pCurrentMove = m_MoveList->GetRoot();
            }
        }
    }
    return true;
}

int init(){
    log("wasm >> init");
    UINT comment_buffer_size = _ONE_MB*2;
    UINT boardText_buffer_size = _ONE_KB;
    UINT buffer_pages = (comment_buffer_size + boardText_buffer_size) / _PAGE_SIZE + 1;
    
    current_log_buffer = 0;
    current_err_buffer = 0;
    current_comment_buffer = 0;
    current_boardText_buffer = 0;
    current_data_buffer = 0;
    end_data_buffer = _ONE_MB;
    
    comment_buffer = skip_data_pages*_PAGE_SIZE + libFile_buffer + _LIBFILE_BUFFER_SIZE + _ONE_KB;
    boardText_buffer = comment_buffer + comment_buffer_size + _ONE_KB;
    data_buffer = boardText_buffer + boardText_buffer_size + _ONE_KB;
        
    log("reset m_Stack");
    /*--------------------------------------
        grow() 前不要初始化这几个全局变量，指针会溢出,
        后续在 checkVersion() 里面初始化
    ----------------------------------------*/
    m_Stack = (Stack*)newBuffer(sizeof(Stack));
    m_MoveList = (MoveList*)newBuffer(sizeof(MoveList));
    m_file = (LibraryFile*)newBuffer(sizeof(LibraryFile));
    commentPages = (TextPages*)newBuffer(sizeof(TextPages));
    /*--------------------------------------*/
    
    return int(skip_data_pages);
}


void setMemoryEnd(UINT size) {
    end_data_buffer = size;
}

//---------------------- sgf cache --------------------

UINT sgfCacheLeng = 0;
char* sgfCache = (char*)&sgf_buffer;

void _outputSGFCache() {
    if (sgfCacheLeng) {
        outputSGFCache(sgfCache, sgfCacheLeng);
        sgfCacheLeng = 0;
    }
}

void pushSGFChar(char c) {
    sgfCache[sgfCacheLeng++] = c;
    if (sgfCacheLeng >= _SGF_BUFFER_SIZE) {
        _outputSGFCache();
    }
}

void pushSGFSpace(int len, bool isFormat) {
    if (!isFormat) return;
    for(int i=0; i<len; i++) {
        pushSGFChar(32);
    }
}

void pushSGFNewLine(bool isFormat) {
    if (!isFormat) return;
    pushSGFChar(10);
}

void pushSGFString(CString str, UINT maxLen ) {
    for (UINT i = 0; i < maxLen; i++) {
        if (str[i]) {
            pushSGFChar(str[i]);
        }
        else break;
    }
}

//---------------------- lib2sgf --------------------

UINT getSGFByteLength(bool isFormat) {
    return m_MoveNode_count*(isFormat ? 136 : 18) + 32;
}

void pushBoardText(CString str) {
    pushSGFString(str, 4);
}

void pushSGFComment(CString str) {
    pushSGFString(str, 1024);
}

void pushLB(MoveNode* node) {
    MoveNode* next = node->mDown;
    CPoint point;
    CString boardText;
    bool wLB = true;
    while (next) {
        boardText = next->getBoardText();
        if (boardText[0]) {
            point = IdxToPoint(next->mIdx);
            if (wLB) {
                pushSGFChar('L');
                pushSGFChar('B');
                wLB = false;
            }
            pushSGFChar('[');
            pushSGFChar(ALPHA[point.x]);
            pushSGFChar(ALPHA[point.y]);
            pushSGFChar(':');
            pushBoardText(boardText);
            pushSGFChar(']');
        }
        next = next->mRight;
    }
}

void pushComment(MoveNode* node) {
    TextPage* page = commentPages->findTextPage(node);
    if (page && page->text[0]) {
        pushSGFChar('C');
        pushSGFChar('[');
        pushSGFComment(page->text);
        pushSGFChar(']');
    }
}

void lib2sgf(bool isFormat) {
    CPoint point;
    UINT count = 0;
    int eCount = 0;
    int depth = 1;
    MoveNode* next = rootMoveNode->mDown;
    next->setIsDown(true);
    m_Stack->ClearAll();
    
    sgfCacheLeng = 0;
    pushSGFChar('(');
    pushSGFNewLine(isFormat);
    eCount += 2;
    
    pushSGFSpace(eCount, isFormat);
    pushSGFString(";GM[1]CA[gb2312]SZ[15]", 128);
    /*pushSGFChar(';');
    pushSGFChar('G');
    pushSGFChar('M');
    pushSGFChar('[');
    pushSGFChar('1');
    pushSGFChar(']');
    pushSGFChar('C');
    pushSGFChar('A');
    pushSGFChar('[');
    pushSGFChar('U');
    pushSGFChar('T');
    pushSGFChar('F');
    pushSGFChar('-');
    pushSGFChar('8');
    pushSGFChar(']');
    pushSGFChar('S');
    pushSGFChar('Z');
    pushSGFChar('[');
    pushSGFChar('1');
    pushSGFChar('5');
    pushSGFChar(']');*/
    pushLB(rootMoveNode);
    pushComment(rootMoveNode);
    pushSGFNewLine(isFormat);
    
    for(int i=0; i < 256; i++) {
        markStack[i] = 0;
    }
    
    while(next) {
        count++;
        if(count%300000==0) loading(count, m_MoveNode_count);
        if (next->mRight) {
            m_Stack->Push(depth, next->mRight);
            markStack[depth] = 1;
        }
        
        if (markStack[depth] && next->isDown()) {
            pushSGFSpace(eCount, isFormat);
            pushSGFChar('(');
            pushSGFNewLine(isFormat);
            eCount += 2;
        }
        
        point = IdxToPoint(next->mIdx);
        pushSGFSpace(eCount, isFormat);
        pushSGFChar(';');
        pushSGFChar(depth % 2 ? 'B' : 'W');
        pushSGFChar('[');
        pushSGFChar(ALPHA[point.x]);
        pushSGFChar(ALPHA[point.y]);
        pushSGFChar(']');
        pushLB(next);
        pushComment(next);
        pushSGFNewLine(isFormat);
        
        if(next->mDown) {
            next = next->mDown;
            next->setIsDown(true);
            depth++;
        }
        else {
            if (!m_Stack->IsEmpty()) {
                int d = 0;
                m_Stack->Pop(d, next);
                next->setIsDown(false);
                for (int i = d+1; i <= depth ; i++) {
                    if (markStack[i]) {
                        eCount -= 2;
                        pushSGFSpace(eCount, isFormat);
                        pushSGFChar(')');
                        pushSGFNewLine(isFormat);
                        markStack[i] = 0;
                    }
                }
                eCount -= 2;
                pushSGFSpace(eCount, isFormat);
                pushSGFChar(')');
                pushSGFChar('(');
                pushSGFNewLine(isFormat);
                eCount += 2;
                depth = d;
            }
            else {
                for (int i = 1; i <= depth ; i++) {
                    if (markStack[i]) {
                        eCount -= 2;
                        pushSGFSpace(eCount, isFormat);
                        pushSGFChar(')');
                        pushSGFNewLine(isFormat);
                        markStack[i] = 0;
                    }
                }
                next = 0;
            }
        }
    }
    
    
    eCount -= 2;
    pushSGFSpace(eCount, isFormat);
    pushSGFChar(')');
    
    _outputSGFCache();
}

