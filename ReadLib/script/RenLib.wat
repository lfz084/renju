(module
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (import "env" "_Z11memoryBoundv" (func $_Z11memoryBoundv))
 (import "env" "_Z14outputSGFCachePcj" (func $_Z14outputSGFCachePcj (param i32 i32)))
 (import "env" "_Z15createSGFBufferj" (func $_Z15createSGFBufferj (param i32) (result i32)))
 (import "env" "_Z7loadingjj" (func $_Z7loadingjj (param i32 i32)))
 (import "env" "_Z9getBufferPhj" (func $_Z9getBufferPhj (param i32 i32) (result i32)))
 (import "env" "memset" (func $memset (param i32 i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 51)
 (data (i32.const 1060) "\00\00\00\00")
 (data (i32.const 1064) "\01\00\00\00")
 (data (i32.const 1068) "\02\00\00\00")
 (data (i32.const 1072) "\03\00\00\00")
 (data (i32.const 1076) "\04\00\00\00")
 (data (i32.const 1080) "\05\00\00\00")
 (data (i32.const 3283008) "\00\00\00\00")
 (data (i32.const 3283012) "\00\00\00\00")
 (data (i32.const 3283016) "\00\00\00\00")
 (data (i32.const 3283024) "ABCDEFGHIJKLMNOPQRSTUVWXYZ\00")
 (data (i32.const 3283052) "P\182\00")
 (data (i32.const 3283056) "0123456789\00")
 (data (i32.const 3283068) "p\182\00")
 (data (i32.const 3283088) "newCPoint\00")
 (data (i32.const 3283104) "newCPoint end\00")
 (data (i32.const 3283120) "newMoveNode\00")
 (data (i32.const 3283136) "newMoveNode end\00")
 (data (i32.const 3283152) "\00\00\00\00")
 (data (i32.const 3283156) "\00\00\00\00")
 (data (i32.const 3283160) "\00\00\00\00")
 (data (i32.const 3283164) "\00\00\00\00")
 (data (i32.const 3283168) "\00\00\00\00")
 (data (i32.const 3283172) "\00\00\00\00")
 (data (i32.const 3283184) "wasm >> init\00")
 (data (i32.const 3283200) "\00\00\00\00")
 (data (i32.const 3283204) "@\04\00\00")
 (data (i32.const 3283216) "abcdefghijklmnopqrstuvwxyz\00")
 (data (i32.const 3283248) "\ffRenLib\ff\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 3283280) "checking code\00")
 (export "memory" (memory $0))
 (export "_Z12getOutBufferv" (func $_Z12getOutBufferv))
 (export "_Z11getInBufferv" (func $_Z11getInBufferv))
 (export "_Z3logPKc" (func $_Z3logPKc))
 (export "_Z3logPc" (func $_Z3logPc))
 (export "_Z7onErrorPKc" (func $_Z7onErrorPKc))
 (export "_Z12getLogBufferv" (func $_Z12getLogBufferv))
 (export "_Z14getErrorBufferv" (func $_Z14getErrorBufferv))
 (export "_Z16getCommentBufferv" (func $_Z16getCommentBufferv))
 (export "_Z18getBoardTextBufferv" (func $_Z18getBoardTextBufferv))
 (export "_Z13getDataBufferv" (func $_Z13getDataBufferv))
 (export "_Z9newBufferj" (func $_Z9newBufferj))
 (export "_Z16getLibFileBufferv" (func $_Z16getLibFileBufferv))
 (export "_Z9newCPointv" (func $_Z9newCPointv))
 (export "_Z9newCPointhh" (func $_Z9newCPointhh))
 (export "_Z14test_newCPointj" (func $_Z14test_newCPointj))
 (export "_Z7isValid6CPoint" (func $_Z7isValid6CPoint))
 (export "_Z10bit_is_oneij" (func $_Z10bit_is_oneij))
 (export "_Z7set_bitiRt" (func $_Z7set_bitiRt))
 (export "_Z9clear_bitiRt" (func $_Z9clear_bitiRt))
 (export "_Z12isValidPoint6CPoint" (func $_Z12isValidPoint6CPoint))
 (export "_Z7isEmptyPc" (func $_Z7isEmptyPc))
 (export "_Z10PosToPointh" (func $_Z10PosToPointh))
 (export "_Z10PointToPos6CPoint" (func $_Z10PointToPos6CPoint))
 (export "_Z10IdxToPointh" (func $_Z10IdxToPointh))
 (export "_Z10PointToIdx6CPoint" (func $_Z10PointToIdx6CPoint))
 (export "_Z8PosToIdxh" (func $_Z8PosToIdxh))
 (export "_Z8IdxToPosh" (func $_Z8IdxToPosh))
 (export "_Z11newMoveNodev" (func $_Z11newMoveNodev))
 (export "_Z11newMoveNodeR8MoveNode" (func $_Z11newMoveNodeR8MoveNode))
 (export "_Z11newMoveNodeh" (func $_Z11newMoveNodeh))
 (export "_Z16test_newMoveNodej" (func $_Z16test_newMoveNodej))
 (export "_Z3msbh" (func $_Z3msbh))
 (export "_Z8LessThan6CPointS_" (func $_Z8LessThan6CPointS_))
 (export "_Z14readOldCommentPc" (func $_Z14readOldCommentPc))
 (export "_Z14readNewCommentPc" (func $_Z14readNewCommentPc))
 (export "_Z13readBoardTextPc" (func $_Z13readBoardTextPc))
 (export "_Z7addMoveP8MoveNodeS0_" (func $_Z7addMoveP8MoveNodeS0_))
 (export "_Z13addAttributesP8MoveNodeS0_RbS1_S1_" (func $_Z13addAttributesP8MoveNodeS0_RbS1_S1_))
 (export "_Z10getVariantP8MoveNodeh" (func $_Z10getVariantP8MoveNodeh))
 (export "_Z11getAutoMovev" (func $_Z11getAutoMovev))
 (export "_Z8findNodeRP8MoveNode6CPoint" (func $_Z8findNodeRP8MoveNode6CPoint))
 (export "_Z19searchInnerHTMLInfoP6CPointj" (func $_Z19searchInnerHTMLInfoP6CPointj))
 (export "_Z7indexOf6CPointPS_i" (func $_Z7indexOf6CPointPS_i))
 (export "_Z11indexOfNode6CPointP4Nodei" (func $_Z11indexOfNode6CPointP4Nodei))
 (export "_Z14getBranchNodesP6CPointi" (func $_Z14getBranchNodesP6CPointi))
 (export "_Z22getMoveNodeCountBufferv" (func $_Z22getMoveNodeCountBufferv))
 (export "_Z12checkVersionv" (func $_Z12checkVersionv))
 (export "_Z15loadAllMoveNodev" (func $_Z15loadAllMoveNodev))
 (export "_Z15createRenjuTreev" (func $_Z15createRenjuTreev))
 (export "_Z4initv" (func $_Z4initv))
 (export "_Z12setMemoryEndj" (func $_Z12setMemoryEndj))
 (export "_Z11pushSGFCharc" (func $_Z11pushSGFCharc))
 (export "_Z7lib2sgfv" (func $_Z7lib2sgfv))
 (func $_Z12getOutBufferv (; 6 ;) (result i32)
  (i32.const 1088)
 )
 (func $_Z11getInBufferv (; 7 ;) (result i32)
  (i32.const 67648)
 )
 (func $_Z3logPKc (; 8 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $1
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $1)
       (i32.const 134208)
      )
      (get_local $2)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $1)
       (i32.const 1048574)
      )
     )
     (set_local $2
      (i32.load8_u
       (get_local $0)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$2
      (i32.and
       (get_local $2)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z3logPc (; 9 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $1
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $1)
       (i32.const 134208)
      )
      (get_local $2)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $1)
       (i32.const 1048574)
      )
     )
     (set_local $2
      (i32.load8_u
       (get_local $0)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$2
      (i32.and
       (get_local $2)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z7onErrorPKc (; 10 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $2
      (i32.load offset=1064
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $3
    (i32.const 10)
   )
   (set_local $1
    (get_local $0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $2)
       (i32.const 1183808)
      )
      (get_local $3)
     )
     (i32.store offset=1064
      (i32.const 0)
      (tee_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $2)
       (i32.const 1048574)
      )
     )
     (set_local $3
      (i32.load8_u
       (get_local $1)
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 1)
      )
     )
     (br_if $label$2
      (i32.and
       (get_local $3)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $2)
     (i32.const 1183808)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.gt_u
     (tee_local $2
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $3
    (i32.const 10)
   )
   (block $label$4
    (loop $label$5
     (i32.store8
      (i32.add
       (get_local $2)
       (i32.const 134208)
      )
      (get_local $3)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
     )
     (br_if $label$4
      (i32.gt_u
       (get_local $2)
       (i32.const 1048574)
      )
     )
     (set_local $3
      (i32.load8_u
       (get_local $0)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$5
      (i32.and
       (get_local $3)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $2)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z12getLogBufferv (; 11 ;) (result i32)
  (i32.const 134208)
 )
 (func $_Z14getErrorBufferv (; 12 ;) (result i32)
  (i32.const 1183808)
 )
 (func $_Z16getCommentBufferv (; 13 ;) (result i32)
  (i32.load offset=3283008
   (i32.const 0)
  )
 )
 (func $_Z18getBoardTextBufferv (; 14 ;) (result i32)
  (i32.load offset=3283012
   (i32.const 0)
  )
 )
 (func $_Z13getDataBufferv (; 15 ;) (result i32)
  (i32.load offset=3283016
   (i32.const 0)
  )
 )
 (func $_Z9newBufferj (; 16 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $0
    (i32.add
     (tee_local $1
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (get_local $0)
    )
   )
  )
  (select
   (i32.const 0)
   (i32.add
    (get_local $1)
    (i32.load offset=3283016
     (i32.const 0)
    )
   )
   (i32.gt_u
    (get_local $0)
    (i32.load offset=1080
     (i32.const 0)
    )
   )
  )
 )
 (func $_Z16getLibFileBufferv (; 17 ;) (result i32)
  (i32.const 2233408)
 )
 (func $_Z9newCPointv (; 18 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $1
    (i32.add
     (tee_local $0
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 2)
    )
   )
  )
  (i32.store16 align=1
   (tee_local $0
    (select
     (i32.const 0)
     (i32.add
      (get_local $0)
      (i32.load offset=3283016
       (i32.const 0)
      )
     )
     (i32.gt_u
      (get_local $1)
      (i32.load offset=1080
       (i32.const 0)
      )
     )
    )
   )
   (i32.const 0)
  )
  (get_local $0)
 )
 (func $_Z9newCPointhh (; 19 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $2
    (i32.add
     (tee_local $3
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 2)
    )
   )
  )
  (i32.store8
   (tee_local $3
    (select
     (i32.const 0)
     (i32.add
      (get_local $3)
      (i32.load offset=3283016
       (i32.const 0)
      )
     )
     (i32.gt_u
      (get_local $2)
      (i32.load offset=1080
       (i32.const 0)
      )
     )
    )
   )
   (get_local $0)
  )
  (i32.store8 offset=1
   (get_local $3)
   (get_local $1)
  )
  (get_local $3)
 )
 (func $_Z14test_newCPointj (; 20 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (set_local $6
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $7
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $8
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $5
        (i32.add
         (get_local $7)
         (get_local $6)
        )
       )
       (i32.const 134208)
      )
      (get_local $8)
     )
     (set_local $4
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
       (i32.const 1048574)
      )
     )
     (set_local $8
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 3283088)
       )
      )
     )
     (set_local $5
      (i32.ne
       (get_local $6)
       (i32.const 9)
      )
     )
     (set_local $6
      (get_local $4)
     )
     (br_if $label$2
      (get_local $5)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $7
     (i32.add
      (get_local $7)
      (get_local $4)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $7)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.eqz
     (get_local $0)
    )
   )
   (set_local $3
    (i32.shl
     (get_local $0)
     (i32.const 1)
    )
   )
   (set_local $1
    (i32.load offset=1080
     (i32.const 0)
    )
   )
   (set_local $6
    (tee_local $2
     (i32.load offset=1076
      (i32.const 0)
     )
    )
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$4
    (i32.store8 offset=1
     (tee_local $4
      (select
       (i32.const 0)
       (i32.add
        (i32.load offset=3283016
         (i32.const 0)
        )
        (get_local $6)
       )
       (i32.gt_u
        (tee_local $6
         (i32.add
          (get_local $6)
          (i32.const 2)
         )
        )
        (get_local $1)
       )
      )
     )
     (tee_local $5
      (i32.and
       (get_local $8)
       (i32.const 15)
      )
     )
    )
    (i32.store8
     (get_local $4)
     (get_local $5)
    )
    (set_local $6
     (get_local $6)
    )
    (br_if $label$4
     (i32.ne
      (get_local $0)
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
    )
   )
   (i32.store offset=1076
    (i32.const 0)
    (i32.add
     (get_local $2)
     (get_local $3)
    )
   )
  )
  (block $label$5
   (br_if $label$5
    (i32.gt_u
     (get_local $7)
     (i32.const 1048574)
    )
   )
   (set_local $8
    (i32.const 10)
   )
   (set_local $6
    (i32.const 0)
   )
   (block $label$6
    (loop $label$7
     (i32.store8
      (i32.add
       (tee_local $5
        (i32.add
         (get_local $7)
         (get_local $6)
        )
       )
       (i32.const 134208)
      )
      (get_local $8)
     )
     (set_local $4
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$6
      (i32.gt_u
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
       (i32.const 1048574)
      )
     )
     (set_local $8
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 3283104)
       )
      )
     )
     (set_local $5
      (i32.ne
       (get_local $6)
       (i32.const 13)
      )
     )
     (set_local $6
      (get_local $4)
     )
     (br_if $label$7
      (get_local $5)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $6
     (i32.add
      (get_local $7)
      (get_local $4)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $6)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z7isValid6CPoint (; 21 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $1
       (i32.load8_u
        (get_local $0)
       )
      )
     )
    )
    (br_if $label$0
     (i32.gt_u
      (i32.and
       (i32.add
        (get_local $1)
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 14)
     )
    )
    (return
     (i32.lt_u
      (i32.and
       (i32.add
        (i32.load8_u offset=1
         (get_local $0)
        )
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 15)
     )
    )
   )
   (return
    (i32.eqz
     (i32.load8_u offset=1
      (get_local $0)
     )
    )
   )
  )
  (i32.const 0)
 )
 (func $_Z10bit_is_oneij (; 22 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.ne
   (i32.and
    (get_local $1)
    (get_local $0)
   )
   (i32.const 0)
  )
 )
 (func $_Z7set_bitiRt (; 23 ;) (param $0 i32) (param $1 i32)
  (i32.store16
   (get_local $1)
   (i32.or
    (i32.load16_u
     (get_local $1)
    )
    (get_local $0)
   )
  )
 )
 (func $_Z9clear_bitiRt (; 24 ;) (param $0 i32) (param $1 i32)
  (i32.store16
   (get_local $1)
   (i32.and
    (i32.xor
     (get_local $0)
     (i32.const -1)
    )
    (i32.load16_u
     (get_local $1)
    )
   )
  )
 )
 (func $_Z12isValidPoint6CPoint (; 25 ;) (param $0 i32) (result i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (i32.load8_u
        (get_local $0)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (return
    (i32.lt_u
     (i32.and
      (i32.add
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 15)
    )
   )
  )
  (i32.const 0)
 )
 (func $_Z7isEmptyPc (; 26 ;) (param $0 i32) (result i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $0)
    )
   )
   (return
    (i32.eqz
     (i32.load8_u
      (get_local $0)
     )
    )
   )
  )
  (i32.const 1)
 )
 (func $_Z10PosToPointh (; 27 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (get_local $1)
     )
    )
    (set_local $2
     (i32.and
      (get_local $1)
      (i32.const 15)
     )
    )
    (set_local $1
     (i32.add
      (i32.shr_u
       (get_local $1)
       (i32.const 4)
      )
      (i32.const 1)
     )
    )
    (br $label$0)
   )
   (set_local $2
    (i32.const 0)
   )
   (set_local $1
    (i32.const 0)
   )
  )
  (i32.store8 offset=1
   (get_local $0)
   (get_local $1)
  )
  (i32.store8
   (get_local $0)
   (get_local $2)
  )
 )
 (func $_Z10PointToPos6CPoint (; 28 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $2
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $1
        (i32.load16_u align=1
         (get_local $0)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (i32.shr_u
        (get_local $1)
        (i32.const 8)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $2
    (i32.add
     (i32.add
      (i32.shl
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const 4)
      )
      (get_local $1)
     )
     (i32.const 240)
    )
   )
  )
  (i32.and
   (get_local $2)
   (i32.const 255)
  )
 )
 (func $_Z10IdxToPointh (; 29 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $2
   (i32.const 0)
  )
  (set_local $3
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eq
     (get_local $1)
     (i32.const 225)
    )
   )
   (set_local $3
    (i32.add
     (i32.div_u
      (get_local $1)
      (i32.const 15)
     )
     (i32.const 1)
    )
   )
   (set_local $2
    (i32.add
     (i32.rem_u
      (get_local $1)
      (i32.const 15)
     )
     (i32.const 1)
    )
   )
  )
  (i32.store8 offset=1
   (get_local $0)
   (get_local $3)
  )
  (i32.store8
   (get_local $0)
   (get_local $2)
  )
 )
 (func $_Z10PointToIdx6CPoint (; 30 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $2
   (i32.const 225)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $1
        (i32.load16_u align=1
         (get_local $0)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (i32.shr_u
        (get_local $1)
        (i32.const 8)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $2
    (i32.add
     (i32.add
      (i32.mul
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const 15)
      )
      (get_local $1)
     )
     (i32.const 240)
    )
   )
  )
  (i32.and
   (get_local $2)
   (i32.const 255)
  )
 )
 (func $_Z8PosToIdxh (; 31 ;) (param $0 i32) (result i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $0
     (i32.add
      (i32.add
       (i32.and
        (get_local $0)
        (i32.const 15)
       )
       (i32.mul
        (i32.shr_u
         (get_local $0)
         (i32.const 4)
        )
        (i32.const 15)
       )
      )
      (i32.const 255)
     )
    )
    (br $label$0)
   )
   (set_local $0
    (i32.const 225)
   )
  )
  (i32.and
   (get_local $0)
   (i32.const 255)
  )
 )
 (func $_Z8IdxToPosh (; 32 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eq
     (get_local $0)
     (i32.const 225)
    )
   )
   (set_local $1
    (i32.add
     (i32.or
      (i32.shl
       (i32.div_u
        (get_local $0)
        (i32.const 15)
       )
       (i32.const 4)
      )
      (i32.rem_u
       (get_local $0)
       (i32.const 15)
      )
     )
     (i32.const 1)
    )
   )
  )
  (i32.and
   (get_local $1)
   (i32.const 255)
  )
 )
 (func $_Z11newMoveNodev (; 33 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $1
    (i32.add
     (tee_local $0
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 16)
    )
   )
  )
  (select
   (i32.const 0)
   (i32.add
    (get_local $0)
    (i32.load offset=3283016
     (i32.const 0)
    )
   )
   (i32.gt_u
    (get_local $1)
    (i32.load offset=1080
     (i32.const 0)
    )
   )
  )
 )
 (func $_Z11newMoveNodeR8MoveNode (; 34 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $1
    (i32.add
     (tee_local $2
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 16)
    )
   )
  )
  (i32.store8
   (tee_local $2
    (select
     (i32.const 0)
     (i32.add
      (get_local $2)
      (i32.load offset=3283016
       (i32.const 0)
      )
     )
     (i32.gt_u
      (get_local $1)
      (i32.load offset=1080
       (i32.const 0)
      )
     )
    )
   )
   (i32.load8_u
    (get_local $0)
   )
  )
  (i32.store16 offset=2
   (get_local $2)
   (i32.load16_u offset=2
    (get_local $0)
   )
  )
  (get_local $2)
 )
 (func $_Z11newMoveNodeh (; 35 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $2
    (i32.add
     (tee_local $1
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 16)
    )
   )
  )
  (i32.store8
   (tee_local $1
    (select
     (i32.const 0)
     (i32.add
      (get_local $1)
      (i32.load offset=3283016
       (i32.const 0)
      )
     )
     (i32.gt_u
      (get_local $2)
      (i32.load offset=1080
       (i32.const 0)
      )
     )
    )
   )
   (get_local $0)
  )
  (get_local $1)
 )
 (func $_Z16test_newMoveNodej (; 36 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (set_local $7
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $6
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $8
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $4
        (i32.add
         (get_local $6)
         (get_local $7)
        )
       )
       (i32.const 134208)
      )
      (get_local $8)
     )
     (set_local $1
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
       (i32.const 1048574)
      )
     )
     (set_local $8
      (i32.load8_u
       (i32.add
        (get_local $7)
        (i32.const 3283120)
       )
      )
     )
     (set_local $4
      (i32.ne
       (get_local $7)
       (i32.const 11)
      )
     )
     (set_local $7
      (get_local $1)
     )
     (br_if $label$2
      (get_local $4)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $6
     (i32.add
      (get_local $6)
      (get_local $1)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $6)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.eqz
     (get_local $0)
    )
   )
   (set_local $3
    (i32.shl
     (get_local $0)
     (i32.const 5)
    )
   )
   (set_local $7
    (i32.add
     (tee_local $2
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 16)
    )
   )
   (set_local $1
    (i32.load offset=1080
     (i32.const 0)
    )
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$4
    (i32.store8
     (tee_local $4
      (select
       (i32.const 0)
       (i32.add
        (i32.add
         (i32.load offset=3283016
          (i32.const 0)
         )
         (get_local $7)
        )
        (i32.const -16)
       )
       (i32.gt_u
        (get_local $7)
        (get_local $1)
       )
      )
     )
     (get_local $8)
    )
    (i32.store8
     (tee_local $5
      (select
       (i32.const 0)
       (i32.add
        (i32.load offset=3283016
         (i32.const 0)
        )
        (get_local $7)
       )
       (i32.gt_u
        (i32.add
         (get_local $7)
         (i32.const 16)
        )
        (get_local $1)
       )
      )
     )
     (get_local $8)
    )
    (i32.store16 offset=2
     (get_local $5)
     (i32.load16_u offset=2
      (get_local $4)
     )
    )
    (set_local $7
     (i32.add
      (get_local $7)
      (i32.const 32)
     )
    )
    (br_if $label$4
     (i32.ne
      (get_local $0)
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
    )
   )
   (i32.store offset=1076
    (i32.const 0)
    (i32.add
     (get_local $2)
     (get_local $3)
    )
   )
  )
  (block $label$5
   (br_if $label$5
    (i32.gt_u
     (get_local $6)
     (i32.const 1048574)
    )
   )
   (set_local $8
    (i32.const 10)
   )
   (set_local $7
    (i32.const 0)
   )
   (block $label$6
    (loop $label$7
     (i32.store8
      (i32.add
       (tee_local $4
        (i32.add
         (get_local $6)
         (get_local $7)
        )
       )
       (i32.const 134208)
      )
      (get_local $8)
     )
     (set_local $1
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br_if $label$6
      (i32.gt_u
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
       (i32.const 1048574)
      )
     )
     (set_local $8
      (i32.load8_u
       (i32.add
        (get_local $7)
        (i32.const 3283136)
       )
      )
     )
     (set_local $4
      (i32.ne
       (get_local $7)
       (i32.const 15)
      )
     )
     (set_local $7
      (get_local $1)
     )
     (br_if $label$7
      (get_local $4)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $7
     (i32.add
      (get_local $6)
      (get_local $1)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $7)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z3msbh (; 37 ;) (param $0 i32) (result i32)
  (i32.and
   (get_local $0)
   (i32.const 128)
  )
 )
 (func $_Z8LessThan6CPointS_ (; 38 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $4
   (i32.const 0)
  )
  (set_local $3
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $0
        (i32.load16_u align=1
         (get_local $0)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $3
    (i32.const 0)
   )
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $2
        (i32.shr_u
         (get_local $0)
         (i32.const 8)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $3
    (i32.add
     (i32.add
      (i32.shl
       (get_local $2)
       (i32.const 4)
      )
      (get_local $0)
     )
     (i32.const 240)
    )
   )
  )
  (block $label$1
   (br_if $label$1
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $0
        (i32.load16_u align=1
         (get_local $1)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (br_if $label$1
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $1
        (i32.shr_u
         (get_local $0)
         (i32.const 8)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $4
    (i32.add
     (i32.add
      (i32.shl
       (get_local $1)
       (i32.const 4)
      )
      (get_local $0)
     )
     (i32.const 240)
    )
   )
  )
  (i32.lt_u
   (i32.and
    (get_local $3)
    (i32.const 255)
   )
   (i32.and
    (get_local $4)
    (i32.const 255)
   )
  )
 )
 (func $_Z14readOldCommentPc (; 39 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store8
   (get_local $0)
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.lt_s
       (tee_local $0
        (i32.load
         (tee_local $1
          (i32.load offset=3283164
           (i32.const 0)
          )
         )
        )
       )
       (i32.load offset=4
        (get_local $1)
       )
      )
     )
     (block $label$3
      (br_if $label$3
       (tee_local $2
        (call $_Z9getBufferPhj
         (i32.const 2233408)
         (i32.const 1048576)
        )
       )
      )
      (set_local $2
       (i32.const 0)
      )
      (set_local $0
       (i32.const 0)
      )
      (br $label$1)
     )
     (set_local $0
      (i32.const 0)
     )
     (i32.store
      (get_local $1)
      (i32.const 0)
     )
     (i32.store
      (i32.add
       (get_local $1)
       (i32.const 4)
      )
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $0)
      (i32.const 1)
     )
    )
    (set_local $2
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 2233408)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $0)
      (i32.const 2)
     )
    )
    (set_local $0
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 2233409)
      )
     )
    )
   )
   (br_if $label$0
    (i32.gt_s
     (i32.shr_s
      (i32.shl
       (i32.or
        (get_local $2)
        (get_local $0)
       )
       (i32.const 24)
      )
      (i32.const 24)
     )
     (i32.const -1)
    )
   )
  )
 )
 (func $_Z14readNewCommentPc (; 40 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $2
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.lt_s
        (tee_local $3
         (i32.load
          (tee_local $1
           (i32.load offset=3283164
            (i32.const 0)
           )
          )
         )
        )
        (i32.load offset=4
         (get_local $1)
        )
       )
      )
      (block $label$4
       (br_if $label$4
        (tee_local $4
         (call $_Z9getBufferPhj
          (i32.const 2233408)
          (i32.const 1048576)
         )
        )
       )
       (set_local $4
        (i32.const 0)
       )
       (set_local $3
        (i32.const 0)
       )
       (br_if $label$2
        (i32.le_u
         (get_local $2)
         (i32.const 1017)
        )
       )
       (br $label$1)
      )
      (set_local $3
       (i32.const 0)
      )
      (i32.store
       (get_local $1)
       (i32.const 0)
      )
      (i32.store
       (i32.add
        (get_local $1)
        (i32.const 4)
       )
       (i32.add
        (get_local $4)
        (i32.const -1)
       )
      )
     )
     (i32.store
      (get_local $1)
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 2233408)
       )
      )
     )
     (i32.store
      (get_local $1)
      (i32.add
       (get_local $3)
       (i32.const 2)
      )
     )
     (set_local $3
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 2233409)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $2)
       (i32.const 1017)
      )
     )
    )
    (i32.store8
     (tee_local $1
      (i32.add
       (get_local $0)
       (get_local $2)
      )
     )
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
     (get_local $3)
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 2)
     )
    )
   )
   (block $label$5
    (br_if $label$5
     (i32.eqz
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
     )
    )
    (br_if $label$0
     (i32.and
      (get_local $3)
      (i32.const 255)
     )
    )
   )
  )
  (i32.store16 align=1
   (i32.add
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 1)
   )
   (i32.const 0)
  )
  (get_local $2)
 )
 (func $_Z13readBoardTextPc (; 41 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $2
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.lt_s
        (tee_local $3
         (i32.load
          (tee_local $1
           (i32.load offset=3283164
            (i32.const 0)
           )
          )
         )
        )
        (i32.load offset=4
         (get_local $1)
        )
       )
      )
      (block $label$4
       (br_if $label$4
        (tee_local $4
         (call $_Z9getBufferPhj
          (i32.const 2233408)
          (i32.const 1048576)
         )
        )
       )
       (set_local $4
        (i32.const 0)
       )
       (set_local $3
        (i32.const 0)
       )
       (br_if $label$2
        (i32.le_u
         (get_local $2)
         (i32.const 3)
        )
       )
       (br $label$1)
      )
      (set_local $3
       (i32.const 0)
      )
      (i32.store
       (get_local $1)
       (i32.const 0)
      )
      (i32.store
       (i32.add
        (get_local $1)
        (i32.const 4)
       )
       (i32.add
        (get_local $4)
        (i32.const -1)
       )
      )
     )
     (i32.store
      (get_local $1)
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 2233408)
       )
      )
     )
     (i32.store
      (get_local $1)
      (i32.add
       (get_local $3)
       (i32.const 2)
      )
     )
     (set_local $3
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 2233409)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $2)
       (i32.const 3)
      )
     )
    )
    (i32.store8
     (tee_local $1
      (i32.add
       (get_local $0)
       (get_local $2)
      )
     )
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
     (get_local $3)
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 2)
     )
    )
   )
   (block $label$5
    (br_if $label$5
     (i32.eqz
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
     )
    )
    (br_if $label$0
     (i32.and
      (get_local $3)
      (i32.const 255)
     )
    )
   )
  )
  (get_local $2)
 )
 (func $_Z7addMoveP8MoveNodeS0_ (; 42 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $3
   (i32.add
    (get_local $0)
    (i32.const 8)
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $0
      (i32.load offset=8
       (get_local $0)
      )
     )
    )
   )
   (block $label$1
    (br_if $label$1
     (i32.ge_u
      (tee_local $2
       (i32.load8_u
        (get_local $1)
       )
      )
      (i32.load8_u
       (get_local $0)
      )
     )
    )
    (i32.store
     (i32.add
      (get_local $1)
      (i32.const 12)
     )
     (get_local $0)
    )
    (i32.store
     (get_local $3)
     (get_local $1)
    )
    (return)
   )
   (loop $label$2
    (set_local $3
     (i32.add
      (get_local $0)
      (i32.const 12)
     )
    )
    (br_if $label$0
     (i32.eqz
      (tee_local $0
       (i32.load offset=12
        (get_local $0)
       )
      )
     )
    )
    (br_if $label$2
     (i32.ge_u
      (get_local $2)
      (i32.load8_u
       (get_local $0)
      )
     )
    )
   )
   (i32.store
    (i32.add
     (get_local $1)
     (i32.const 12)
    )
    (get_local $0)
   )
  )
  (i32.store
   (get_local $3)
   (get_local $1)
  )
 )
 (func $_Z13addAttributesP8MoveNodeS0_RbS1_S1_ (; 43 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store8
   (get_local $2)
   (i32.const 0)
  )
  (i32.store8
   (get_local $3)
   (i32.const 0)
  )
  (i32.store8
   (get_local $4)
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (i32.and
      (tee_local $6
       (i32.load16_u offset=2
        (get_local $1)
       )
      )
      (i32.const 16)
     )
    )
   )
   (br_if $label$0
    (i32.and
     (tee_local $5
      (i32.load16_u offset=2
       (get_local $0)
      )
     )
     (i32.const 16)
    )
   )
   (i32.store16
    (i32.add
     (get_local $0)
     (i32.const 2)
    )
    (i32.or
     (get_local $5)
     (i32.const 16)
    )
   )
   (i32.store8
    (get_local $2)
    (i32.const 1)
   )
   (set_local $6
    (i32.load16_u
     (i32.add
      (get_local $1)
      (i32.const 2)
     )
    )
   )
  )
  (block $label$1
   (br_if $label$1
    (i32.and
     (get_local $6)
     (i32.const 2)
    )
   )
   (br_if $label$1
    (i32.eqz
     (i32.and
      (tee_local $2
       (i32.load16_u offset=2
        (get_local $0)
       )
      )
      (i32.const 2)
     )
    )
   )
   (i32.store16
    (i32.add
     (get_local $0)
     (i32.const 2)
    )
    (i32.and
     (get_local $2)
     (i32.const 65533)
    )
   )
   (i32.store8
    (get_local $3)
    (i32.const 1)
   )
   (set_local $6
    (i32.load16_u
     (i32.add
      (get_local $1)
      (i32.const 2)
     )
    )
   )
  )
  (block $label$2
   (br_if $label$2
    (i32.eqz
     (i32.and
      (get_local $6)
      (i32.const 4)
     )
    )
   )
   (br_if $label$2
    (i32.and
     (tee_local $6
      (i32.load16_u offset=2
       (get_local $0)
      )
     )
     (i32.const 4)
    )
   )
   (i32.store8
    (get_local $4)
    (i32.const 1)
   )
   (i32.store16
    (i32.add
     (get_local $0)
     (i32.const 2)
    )
    (i32.or
     (get_local $6)
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z10getVariantP8MoveNodeh (; 44 ;) (param $0 i32) (param $1 i32) (result i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $0
       (i32.load offset=8
        (get_local $0)
       )
      )
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.eq
       (i32.load8_u
        (get_local $0)
       )
       (get_local $1)
      )
     )
     (loop $label$3
      (br_if $label$0
       (i32.eqz
        (tee_local $0
         (i32.load offset=12
          (get_local $0)
         )
        )
       )
      )
      (br_if $label$3
       (i32.ne
        (i32.load8_u
         (get_local $0)
        )
        (get_local $1)
       )
      )
     )
    )
    (return
     (get_local $0)
    )
   )
   (return
    (i32.const 0)
   )
  )
  (i32.const 0)
 )
 (func $_Z11getAutoMovev (; 45 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $5
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $2
      (i32.load offset=8
       (i32.load offset=3283152
        (i32.const 0)
       )
      )
     )
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (set_local $1
    (i32.const 1088)
   )
   (loop $label$1
    (br_if $label$0
     (i32.load offset=12
      (get_local $2)
     )
    )
    (set_local $3
     (i32.const 0)
    )
    (set_local $4
     (i32.const 0)
    )
    (block $label$2
     (br_if $label$2
      (i32.eq
       (tee_local $0
        (i32.load8_u
         (get_local $2)
        )
       )
       (i32.const 225)
      )
     )
     (set_local $4
      (i32.add
       (i32.div_u
        (get_local $0)
        (i32.const 15)
       )
       (i32.const 1)
      )
     )
     (set_local $3
      (i32.add
       (i32.rem_u
        (get_local $0)
        (i32.const 15)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store16
     (get_local $1)
     (i32.or
      (i32.shl
       (get_local $4)
       (i32.const 8)
      )
      (i32.and
       (get_local $3)
       (i32.const 255)
      )
     )
    )
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 2)
     )
    )
    (set_local $5
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (br_if $label$1
     (tee_local $2
      (i32.load offset=8
       (get_local $2)
      )
     )
    )
   )
  )
  (get_local $5)
 )
 (func $_Z8findNodeRP8MoveNode6CPoint (; 46 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $5
      (i32.load
       (get_local $0)
      )
     )
    )
   )
   (set_local $3
    (i32.and
     (i32.load8_u
      (get_local $1)
     )
     (i32.const 255)
    )
   )
   (set_local $4
    (i32.and
     (i32.load8_u offset=1
      (get_local $1)
     )
     (i32.const 255)
    )
   )
   (loop $label$1
    (set_local $1
     (i32.const 0)
    )
    (set_local $6
     (i32.const 0)
    )
    (block $label$2
     (br_if $label$2
      (i32.eq
       (tee_local $2
        (i32.load8_u
         (get_local $5)
        )
       )
       (i32.const 225)
      )
     )
     (set_local $6
      (i32.add
       (i32.div_u
        (get_local $2)
        (i32.const 15)
       )
       (i32.const 1)
      )
     )
     (set_local $1
      (i32.add
       (i32.rem_u
        (get_local $2)
        (i32.const 15)
       )
       (i32.const 1)
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i32.ne
       (i32.and
        (get_local $1)
        (i32.const 255)
       )
       (get_local $3)
      )
     )
     (br_if $label$0
      (i32.eq
       (i32.and
        (get_local $6)
        (i32.const 255)
       )
       (get_local $4)
      )
     )
    )
    (block $label$4
     (br_if $label$4
      (i32.eqz
       (tee_local $5
        (i32.load offset=12
         (get_local $5)
        )
       )
      )
     )
     (i32.store
      (get_local $0)
      (get_local $5)
     )
     (br $label$1)
    )
   )
   (i32.store
    (get_local $0)
    (i32.const 0)
   )
  )
 )
 (func $_Z19searchInnerHTMLInfoP6CPointj (; 47 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (i64.store offset=1088
   (i32.const 0)
   (i64.const -4294967296)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $1)
    )
   )
   (set_local $9
    (i32.load offset=3283152
     (i32.const 0)
    )
   )
   (set_local $2
    (i32.add
     (get_local $1)
     (i32.const -1)
    )
   )
   (set_local $3
    (i32.load offset=3283168
     (i32.const 0)
    )
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$1
    (br_if $label$0
     (i32.eqz
      (tee_local $9
       (i32.load offset=8
        (get_local $9)
       )
      )
     )
    )
    (set_local $5
     (i32.shr_u
      (tee_local $4
       (i32.load16_u
        (i32.add
         (i32.shl
          (get_local $8)
          (i32.const 1)
         )
         (i32.const 67648)
        )
       )
      )
      (i32.const 8)
     )
    )
    (loop $label$2
     (set_local $10
      (i32.const 0)
     )
     (set_local $11
      (i32.const 0)
     )
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (get_local $9)
         )
        )
        (i32.const 225)
       )
      )
      (set_local $11
       (i32.add
        (i32.div_u
         (get_local $6)
         (i32.const 15)
        )
        (i32.const 1)
       )
      )
      (set_local $10
       (i32.add
        (i32.rem_u
         (get_local $6)
         (i32.const 15)
        )
        (i32.const 1)
       )
      )
     )
     (block $label$4
      (block $label$5
       (br_if $label$5
        (i32.ne
         (i32.and
          (get_local $10)
          (i32.const 255)
         )
         (i32.and
          (get_local $4)
          (i32.const 255)
         )
        )
       )
       (br_if $label$4
        (i32.eq
         (i32.and
          (get_local $11)
          (i32.const 255)
         )
         (get_local $5)
        )
       )
      )
      (br_if $label$2
       (tee_local $9
        (i32.load offset=12
         (get_local $9)
        )
       )
      )
      (br $label$0)
     )
    )
    (br_if $label$0
     (i32.eqz
      (get_local $9)
     )
    )
    (block $label$6
     (br_if $label$6
      (i32.ne
       (get_local $8)
       (get_local $2)
      )
     )
     (br_if $label$6
      (i32.eqz
       (i32.and
        (i32.load16_u offset=2
         (get_local $9)
        )
        (i32.const 8)
       )
      )
     )
     (br_if $label$6
      (i32.lt_s
       (tee_local $11
        (i32.add
         (i32.load
          (i32.add
           (get_local $3)
           (i32.const 8)
          )
         )
         (i32.const -1)
        )
       )
       (i32.const 0)
      )
     )
     (set_local $4
      (i32.add
       (tee_local $10
        (i32.load
         (get_local $3)
        )
       )
       (tee_local $11
        (i32.shl
         (get_local $11)
         (i32.const 10)
        )
       )
      )
     )
     (set_local $11
      (i32.add
       (get_local $10)
       (i32.shl
        (i32.div_s
         (i32.shr_s
          (get_local $11)
          (i32.const 10)
         )
         (i32.const 2)
        )
        (i32.const 10)
       )
      )
     )
     (set_local $6
      (i32.const 0)
     )
     (loop $label$7
      (set_local $6
       (i32.add
        (get_local $6)
        (i32.const -1)
       )
      )
      (block $label$8
       (loop $label$9
        (br_if $label$6
         (i32.gt_s
          (tee_local $5
           (i32.add
            (get_local $6)
            (i32.const 1)
           )
          )
          (i32.const 31)
         )
        )
        (br_if $label$8
         (i32.eq
          (tee_local $7
           (i32.load
            (get_local $11)
           )
          )
          (get_local $9)
         )
        )
        (block $label$10
         (br_if $label$10
          (i32.le_u
           (get_local $7)
           (get_local $9)
          )
         )
         (set_local $11
          (i32.add
           (get_local $10)
           (i32.shl
            (i32.div_s
             (i32.shr_s
              (i32.sub
               (tee_local $4
                (i32.add
                 (get_local $11)
                 (i32.const -1024)
                )
               )
               (get_local $10)
              )
              (i32.const 10)
             )
             (i32.const 2)
            )
            (i32.const 10)
           )
          )
         )
         (set_local $6
          (get_local $5)
         )
         (br_if $label$9
          (i32.le_u
           (get_local $10)
           (get_local $4)
          )
         )
         (br $label$6)
        )
       )
       (set_local $11
        (i32.add
         (tee_local $10
          (i32.add
           (get_local $11)
           (i32.const 1024)
          )
         )
         (i32.shl
          (i32.div_s
           (i32.shr_s
            (i32.sub
             (get_local $4)
             (get_local $10)
            )
            (i32.const 10)
           )
           (i32.const 2)
          )
          (i32.const 10)
         )
        )
       )
       (set_local $6
        (i32.add
         (get_local $6)
         (i32.const 2)
        )
       )
       (br_if $label$7
        (i32.le_u
         (get_local $10)
         (get_local $4)
        )
       )
       (br $label$6)
      )
     )
     (i32.store offset=1092
      (i32.const 0)
      (get_local $2)
     )
     (i32.store offset=1088
      (i32.const 0)
      (i32.add
       (get_local $11)
       (i32.const 4)
      )
     )
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
      (get_local $1)
     )
    )
   )
  )
 )
 (func $_Z7indexOf6CPointPS_i (; 48 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (set_local $3
     (i32.and
      (i32.load8_u
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (set_local $0
     (i32.and
      (i32.load8_u offset=1
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (loop $label$2
     (block $label$3
      (br_if $label$3
       (i32.ne
        (i32.load8_u
         (get_local $1)
        )
        (get_local $3)
       )
      )
      (br_if $label$0
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
        (get_local $0)
       )
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 2)
      )
     )
     (br_if $label$2
      (i32.lt_s
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (get_local $2)
      )
     )
    )
   )
   (return
    (i32.const -1)
   )
  )
  (get_local $4)
 )
 (func $_Z11indexOfNode6CPointP4Nodei (; 49 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (set_local $3
     (i32.and
      (i32.load8_u
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (set_local $0
     (i32.and
      (i32.load8_u offset=1
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (loop $label$2
     (block $label$3
      (br_if $label$3
       (i32.ne
        (i32.load8_u
         (get_local $1)
        )
        (get_local $3)
       )
      )
      (br_if $label$0
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
        (get_local $0)
       )
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 12)
      )
     )
     (br_if $label$2
      (i32.lt_s
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (get_local $2)
      )
     )
    )
   )
   (return
    (i32.const -1)
   )
  )
  (get_local $4)
 )
 (func $_Z14getBranchNodesP6CPointi (; 50 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (i32.store offset=1088
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $2
   (i32.rem_s
    (i32.add
     (get_local $1)
     (i32.const 1)
    )
    (i32.const 2)
   )
  )
  (set_local $16
   (i32.load offset=8
    (i32.load offset=3283152
     (i32.const 0)
    )
   )
  )
  (set_local $10
   (i32.const 1092)
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $11
   (i32.const 0)
  )
  (set_local $12
   (i32.const 0)
  )
  (set_local $13
   (i32.const 0)
  )
  (set_local $14
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (block $label$7
          (br_if $label$7
           (i32.eqz
            (tee_local $3
             (get_local $16)
            )
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $6
           (i32.const 0)
          )
          (block $label$8
           (br_if $label$8
            (tee_local $8
             (i32.eq
              (tee_local $4
               (i32.load8_u
                (get_local $3)
               )
              )
              (i32.const 225)
             )
            )
           )
           (set_local $6
            (i32.add
             (i32.div_u
              (get_local $4)
              (i32.const 15)
             )
             (i32.const 1)
            )
           )
           (set_local $5
            (i32.add
             (i32.rem_u
              (get_local $4)
              (i32.const 15)
             )
             (i32.const 1)
            )
           )
          )
          (set_local $7
           (i32.const -1)
          )
          (br_if $label$5
           (i32.lt_s
            (get_local $1)
            (i32.const 1)
           )
          )
          (set_local $16
           (i32.const 0)
          )
          (set_local $15
           (get_local $0)
          )
          (loop $label$9
           (block $label$10
            (br_if $label$10
             (i32.ne
              (i32.load8_u
               (get_local $15)
              )
              (i32.and
               (get_local $5)
               (i32.const 255)
              )
             )
            )
            (br_if $label$6
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $15)
                (i32.const 1)
               )
              )
              (i32.and
               (get_local $6)
               (i32.const 255)
              )
             )
            )
           )
           (set_local $15
            (i32.add
             (get_local $15)
             (i32.const 2)
            )
           )
           (br_if $label$9
            (i32.lt_s
             (tee_local $16
              (i32.add
               (get_local $16)
               (i32.const 1)
              )
             )
             (get_local $1)
            )
           )
           (br $label$5)
          )
         )
         (br_if $label$4
          (i32.lt_s
           (get_local $13)
           (i32.const 1)
          )
         )
         (set_local $11
          (select
           (get_local $11)
           (i32.const 0)
           (tee_local $5
            (i32.or
             (i32.eqz
              (get_local $12)
             )
             (i32.lt_s
              (get_local $11)
              (tee_local $16
               (i32.load
                (i32.add
                 (tee_local $15
                  (i32.shl
                   (tee_local $13
                    (i32.add
                     (get_local $13)
                     (i32.const -1)
                    )
                   )
                   (i32.const 3)
                  )
                 )
                 (i32.const 69696)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $12
          (select
           (get_local $12)
           (i32.const 0)
           (get_local $5)
          )
         )
         (set_local $14
          (i32.add
           (get_local $16)
           (i32.const -1)
          )
         )
         (set_local $16
          (i32.load
           (i32.add
            (get_local $15)
            (i32.const 69700)
           )
          )
         )
         (br $label$0)
        )
        (set_local $7
         (get_local $16)
        )
       )
       (i32.store
        (i32.add
         (i32.shl
          (get_local $14)
          (i32.const 2)
         )
         (i32.const 68672)
        )
        (get_local $3)
       )
       (set_local $5
        (i32.add
         (get_local $14)
         (i32.const 1)
        )
       )
       (block $label$11
        (br_if $label$11
         (i32.eqz
          (tee_local $15
           (i32.load offset=12
            (get_local $3)
           )
          )
         )
        )
        (i32.store
         (i32.add
          (tee_local $16
           (i32.shl
            (get_local $13)
            (i32.const 3)
           )
          )
          (i32.const 69696)
         )
         (get_local $5)
        )
        (i32.store
         (i32.add
          (get_local $16)
          (i32.const 69700)
         )
         (get_local $15)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (block $label$12
        (br_if $label$12
         (i32.ge_s
          (get_local $14)
          (get_local $1)
         )
        )
        (block $label$13
         (br_if $label$13
          (i32.ge_s
           (get_local $7)
           (i32.const 0)
          )
         )
         (set_local $16
          (i32.const 0)
         )
         (set_local $14
          (get_local $5)
         )
         (br_if $label$0
          (get_local $12)
         )
         (set_local $14
          (get_local $5)
         )
         (br_if $label$0
          (i32.ne
           (get_local $7)
           (i32.const -1)
          )
         )
         (set_local $16
          (i32.const 0)
         )
         (set_local $12
          (i32.const 0)
         )
         (set_local $14
          (get_local $5)
         )
         (br_if $label$0
          (i32.ne
           (i32.rem_s
            (get_local $5)
            (i32.const 2)
           )
           (get_local $2)
          )
         )
         (set_local $16
          (i32.load offset=8
           (get_local $3)
          )
         )
         (set_local $11
          (get_local $5)
         )
         (set_local $12
          (get_local $3)
         )
         (set_local $14
          (get_local $5)
         )
         (br $label$0)
        )
        (set_local $15
         (i32.rem_s
          (get_local $14)
          (i32.const 2)
         )
        )
        (set_local $16
         (i32.const 0)
        )
        (set_local $14
         (get_local $5)
        )
        (br_if $label$0
         (i32.ne
          (get_local $15)
          (i32.and
           (get_local $7)
           (i32.const 1)
          )
         )
        )
        (set_local $16
         (i32.load offset=8
          (get_local $3)
         )
        )
        (set_local $14
         (get_local $5)
        )
        (br $label$0)
       )
       (set_local $15
        (i32.ne
         (get_local $14)
         (get_local $1)
        )
       )
       (set_local $16
        (get_local $3)
       )
       (set_local $14
        (get_local $5)
       )
       (br_if $label$0
        (get_local $15)
       )
       (block $label$14
        (br_if $label$14
         (i32.ge_s
          (get_local $7)
          (i32.const 0)
         )
        )
        (set_local $16
         (i32.const 0)
        )
        (set_local $14
         (get_local $5)
        )
        (br_if $label$0
         (get_local $12)
        )
        (set_local $14
         (get_local $5)
        )
        (br_if $label$0
         (i32.ne
          (get_local $7)
          (i32.const -1)
         )
        )
        (set_local $6
         (i32.const 0)
        )
        (set_local $14
         (i32.const 0)
        )
        (block $label$15
         (br_if $label$15
          (get_local $8)
         )
         (set_local $14
          (i32.add
           (i32.div_u
            (get_local $4)
            (i32.const 15)
           )
           (i32.const 1)
          )
         )
         (set_local $6
          (i32.add
           (i32.rem_u
            (get_local $4)
            (i32.const 15)
           )
           (i32.const 1)
          )
         )
        )
        (block $label$16
         (block $label$17
          (block $label$18
           (br_if $label$18
            (i32.lt_s
             (get_local $9)
             (i32.const 1)
            )
           )
           (set_local $16
            (i32.const 0)
           )
           (set_local $15
            (i32.const 1100)
           )
           (block $label$19
            (loop $label$20
             (block $label$21
              (br_if $label$21
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $15)
                  (i32.const -8)
                 )
                )
                (i32.and
                 (get_local $6)
                 (i32.const 255)
                )
               )
              )
              (br_if $label$19
               (i32.eq
                (i32.load8_u
                 (i32.add
                  (get_local $15)
                  (i32.const -7)
                 )
                )
                (i32.and
                 (get_local $14)
                 (i32.const 255)
                )
               )
              )
             )
             (set_local $15
              (i32.add
               (get_local $15)
               (i32.const 12)
              )
             )
             (br_if $label$20
              (i32.lt_s
               (tee_local $16
                (i32.add
                 (get_local $16)
                 (i32.const 1)
                )
               )
               (get_local $9)
              )
             )
             (br $label$18)
            )
           )
           (br_if $label$17
            (i32.ge_s
             (get_local $16)
             (i32.const 0)
            )
           )
          )
          (set_local $16
           (i32.const 0)
          )
          (set_local $15
           (i32.const 0)
          )
          (set_local $6
           (i32.const 0)
          )
          (block $label$22
           (br_if $label$22
            (get_local $8)
           )
           (set_local $6
            (i32.add
             (i32.div_u
              (get_local $4)
              (i32.const 15)
             )
             (i32.const 1)
            )
           )
           (set_local $15
            (i32.add
             (i32.rem_u
              (get_local $4)
              (i32.const 15)
             )
             (i32.const 1)
            )
           )
          )
          (i32.store16 align=1
           (get_local $10)
           (i32.or
            (i32.shl
             (get_local $6)
             (i32.const 8)
            )
            (i32.and
             (get_local $15)
             (i32.const 255)
            )
           )
          )
          (i32.store offset=8
           (get_local $10)
           (i32.const 0)
          )
          (i32.store offset=4
           (get_local $10)
           (i32.add
            (get_local $3)
            (i32.const 4)
           )
          )
          (i32.store offset=1088
           (i32.const 0)
           (tee_local $9
            (i32.add
             (i32.load offset=1088
              (i32.const 0)
             )
             (i32.const 1)
            )
           )
          )
          (set_local $10
           (i32.add
            (get_local $10)
            (i32.const 12)
           )
          )
          (br $label$16)
         )
         (set_local $16
          (i32.const 0)
         )
         (set_local $12
          (i32.const 0)
         )
         (set_local $14
          (get_local $5)
         )
         (br_if $label$0
          (i32.load
           (tee_local $6
            (i32.add
             (get_local $15)
             (i32.const -4)
            )
           )
          )
         )
         (set_local $16
          (i32.const 0)
         )
         (i32.store
          (get_local $15)
          (i32.const 0)
         )
         (i32.store
          (get_local $6)
          (i32.add
           (get_local $3)
           (i32.const 4)
          )
         )
        )
        (set_local $12
         (i32.const 0)
        )
        (set_local $14
         (get_local $5)
        )
        (br $label$0)
       )
       (set_local $6
        (i32.const 0)
       )
       (set_local $14
        (i32.const 0)
       )
       (block $label$23
        (br_if $label$23
         (tee_local $4
          (i32.eq
           (tee_local $7
            (i32.load8_u
             (get_local $12)
            )
           )
           (i32.const 225)
          )
         )
        )
        (set_local $14
         (i32.add
          (i32.div_u
           (get_local $7)
           (i32.const 15)
          )
          (i32.const 1)
         )
        )
        (set_local $6
         (i32.add
          (i32.rem_u
           (get_local $7)
           (i32.const 15)
          )
          (i32.const 1)
         )
        )
       )
       (br_if $label$2
        (i32.lt_s
         (get_local $9)
         (i32.const 1)
        )
       )
       (set_local $16
        (i32.const 0)
       )
       (set_local $15
        (i32.const 1100)
       )
       (loop $label$24
        (block $label$25
         (br_if $label$25
          (i32.ne
           (i32.load8_u
            (i32.add
             (get_local $15)
             (i32.const -8)
            )
           )
           (i32.and
            (get_local $6)
            (i32.const 255)
           )
          )
         )
         (br_if $label$3
          (i32.eq
           (i32.load8_u
            (i32.add
             (get_local $15)
             (i32.const -7)
            )
           )
           (i32.and
            (get_local $14)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const 12)
         )
        )
        (br_if $label$24
         (i32.lt_s
          (tee_local $16
           (i32.add
            (get_local $16)
            (i32.const 1)
           )
          )
          (get_local $9)
         )
        )
        (br $label$2)
       )
      )
      (return)
     )
     (br_if $label$1
      (i32.ge_s
       (get_local $16)
       (i32.const 0)
      )
     )
    )
    (set_local $16
     (i32.const 0)
    )
    (set_local $15
     (i32.const 0)
    )
    (set_local $6
     (i32.const 0)
    )
    (block $label$26
     (br_if $label$26
      (get_local $4)
     )
     (set_local $6
      (i32.add
       (i32.div_u
        (get_local $7)
        (i32.const 15)
       )
       (i32.const 1)
      )
     )
     (set_local $15
      (i32.add
       (i32.rem_u
        (get_local $7)
        (i32.const 15)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store16 align=1
     (get_local $10)
     (i32.or
      (i32.shl
       (get_local $6)
       (i32.const 8)
      )
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
    )
    (i32.store offset=8
     (get_local $10)
     (i32.const 0)
    )
    (i32.store offset=4
     (get_local $10)
     (i32.add
      (get_local $3)
      (i32.const 4)
     )
    )
    (i32.store offset=1088
     (i32.const 0)
     (tee_local $9
      (i32.add
       (i32.load offset=1088
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (set_local $10
     (i32.add
      (get_local $10)
      (i32.const 12)
     )
    )
    (set_local $14
     (get_local $5)
    )
    (br $label$0)
   )
   (set_local $16
    (i32.const 0)
   )
   (set_local $14
    (get_local $5)
   )
   (br_if $label$0
    (i32.load
     (tee_local $6
      (i32.add
       (get_local $15)
       (i32.const -4)
      )
     )
    )
   )
   (set_local $16
    (i32.const 0)
   )
   (i32.store
    (get_local $15)
    (i32.const 0)
   )
   (i32.store
    (get_local $6)
    (i32.add
     (get_local $3)
     (i32.const 4)
    )
   )
   (set_local $14
    (get_local $5)
   )
   (br $label$0)
  )
 )
 (func $_Z22getMoveNodeCountBufferv (; 51 ;) (result i32)
  (i32.const 3283172)
 )
 (func $_Z12checkVersionv (; 52 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $7
   (i32.const 0)
  )
  (set_local $0
   (i32.load offset=3283164
    (i32.const 0)
   )
  )
  (set_local $1
   (call $_Z9getBufferPhj
    (i32.const 2233408)
    (i32.const 20)
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $2
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $6
    (i32.const 10)
   )
   (set_local $5
    (i32.const 0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $4
        (i32.add
         (get_local $2)
         (get_local $5)
        )
       )
       (i32.const 134208)
      )
      (get_local $6)
     )
     (set_local $3
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
       (i32.const 1048574)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 3283280)
       )
      )
     )
     (set_local $4
      (i32.ne
       (get_local $5)
       (i32.const 13)
      )
     )
     (set_local $5
      (get_local $3)
     )
     (br_if $label$2
      (get_local $4)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $5
     (i32.add
      (get_local $2)
      (get_local $3)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $5)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.ne
     (get_local $1)
     (i32.const 20)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (set_local $6
    (i32.const 1)
   )
   (block $label$4
    (loop $label$5
     (set_local $6
      (i32.and
       (get_local $6)
       (tee_local $3
        (i32.eq
         (i32.load8_u
          (i32.add
           (get_local $5)
           (i32.const 2233408)
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $5)
           (i32.const 3283248)
          )
         )
        )
       )
      )
     )
     (br_if $label$4
      (i32.gt_s
       (get_local $5)
       (i32.const 6)
      )
     )
     (set_local $5
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br_if $label$5
      (get_local $3)
     )
    )
   )
   (block $label$6
    (block $label$7
     (br_if $label$7
      (i32.eqz
       (get_local $6)
      )
     )
     (set_local $7
      (i32.const 0)
     )
     (i32.store8 offset=12
      (get_local $0)
      (tee_local $5
       (i32.load8_u offset=2233416
        (i32.const 0)
       )
      )
     )
     (i32.store8 offset=13
      (get_local $0)
      (tee_local $6
       (i32.load8_u offset=2233417
        (i32.const 0)
       )
      )
     )
     (br_if $label$6
      (i32.le_u
       (i32.add
        (get_local $6)
        (i32.mul
         (get_local $5)
         (i32.const 100)
        )
       )
       (i32.const 304)
      )
     )
     (br $label$3)
    )
    (set_local $7
     (i32.const 0)
    )
    (br_if $label$3
     (i32.ne
      (i32.load8_u offset=2233408
       (i32.const 0)
      )
      (i32.const 120)
     )
    )
   )
   (i32.store offset=904
    (call $memset
     (i32.load offset=3283160
      (i32.const 0)
     )
     (i32.const 0)
     (i32.const 904)
    )
    (i32.const -1)
   )
   (drop
    (call $memset
     (i32.load offset=3283156
      (i32.const 0)
     )
     (i32.const 0)
     (i32.const 1804)
    )
   )
   (i32.store
    (i32.load offset=3283168
     (i32.const 0)
    )
    (i32.load offset=3283008
     (i32.const 0)
    )
   )
   (i32.store offset=4
    (tee_local $5
     (i32.load offset=3283168
      (i32.const 0)
     )
    )
    (i32.add
     (i32.load offset=3283008
      (i32.const 0)
     )
     (i32.const 2097152)
    )
   )
   (i32.store offset=8
    (get_local $5)
    (i32.const 0)
   )
   (block $label$8
    (block $label$9
     (br_if $label$9
      (i32.eq
       (i32.load offset=904
        (tee_local $5
         (i32.load offset=3283160
          (i32.const 0)
         )
        )
       )
       (i32.const -1)
      )
     )
     (i32.store
      (i32.add
       (get_local $5)
       (i32.const 904)
      )
      (i32.const 0)
     )
     (set_local $6
      (i32.load
       (get_local $5)
      )
     )
     (br $label$8)
    )
    (i32.store offset=1076
     (i32.const 0)
     (tee_local $3
      (i32.add
       (tee_local $6
        (i32.load offset=1076
         (i32.const 0)
        )
       )
       (i32.const 16)
      )
     )
    )
    (set_local $4
     (i32.load offset=1080
      (i32.const 0)
     )
    )
    (set_local $2
     (i32.load offset=3283016
      (i32.const 0)
     )
    )
    (i32.store
     (i32.add
      (get_local $5)
      (i32.const 904)
     )
     (i32.const 0)
    )
    (i32.store
     (get_local $5)
     (tee_local $6
      (select
       (i32.const 0)
       (i32.add
        (get_local $2)
        (get_local $6)
       )
       (i32.gt_u
        (get_local $3)
        (get_local $4)
       )
      )
     )
    )
    (i32.store8
     (get_local $6)
     (i32.const 225)
    )
   )
   (i32.store offset=3283152
    (i32.const 0)
    (get_local $6)
   )
   (return
    (i32.const 1)
   )
  )
  (get_local $7)
 )
 (func $_Z15loadAllMoveNodev (; 53 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (i32.store offset=1076
   (i32.const 0)
   (tee_local $0
    (i32.add
     (tee_local $4
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 16)
    )
   )
  )
  (i32.store offset=3283172
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $1
   (select
    (i32.const 0)
    (i32.add
     (get_local $4)
     (i32.load offset=3283016
      (i32.const 0)
     )
    )
    (i32.gt_u
     (get_local $0)
     (i32.load offset=1080
      (i32.const 0)
     )
    )
   )
  )
  (block $label$0
   (loop $label$1
    (br_if $label$0
     (i32.eqz
      (call $_ZN11LibraryFile3GetER8MoveNode
       (i32.load offset=3283164
        (i32.const 0)
       )
       (get_local $1)
      )
     )
    )
    (i32.store offset=3283172
     (i32.const 0)
     (i32.add
      (i32.load offset=3283172
       (i32.const 0)
      )
      (i32.const 1)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (i32.and
        (tee_local $4
         (i32.load16_u offset=2
          (get_local $1)
         )
        )
        (i32.const 32)
       )
      )
     )
     (i32.store8 offset=67648
      (i32.const 0)
      (i32.const 0)
     )
     (loop $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.lt_s
          (tee_local $4
           (i32.load
            (tee_local $0
             (i32.load offset=3283164
              (i32.const 0)
             )
            )
           )
          )
          (i32.load offset=4
           (get_local $0)
          )
         )
        )
        (block $label$6
         (br_if $label$6
          (tee_local $3
           (call $_Z9getBufferPhj
            (i32.const 2233408)
            (i32.const 1048576)
           )
          )
         )
         (set_local $3
          (i32.const 0)
         )
         (set_local $4
          (i32.const 0)
         )
         (br $label$4)
        )
        (set_local $4
         (i32.const 0)
        )
        (i32.store
         (get_local $0)
         (i32.const 0)
        )
        (i32.store
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
         (i32.add
          (get_local $3)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (set_local $3
        (i32.load8_u
         (i32.add
          (get_local $4)
          (i32.const 2233408)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $4)
         (i32.const 2)
        )
       )
       (set_local $4
        (i32.load8_u
         (i32.add
          (get_local $4)
          (i32.const 2233409)
         )
        )
       )
      )
      (br_if $label$3
       (i32.gt_s
        (i32.shr_s
         (i32.shl
          (i32.or
           (get_local $4)
           (get_local $3)
          )
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const -1)
       )
      )
     )
     (i32.store16
      (tee_local $4
       (i32.add
        (get_local $1)
        (i32.const 2)
       )
      )
      (tee_local $4
       (i32.and
        (i32.load16_u
         (get_local $4)
        )
        (i32.const -41)
       )
      )
     )
    )
    (block $label$7
     (br_if $label$7
      (i32.eqz
       (i32.and
        (get_local $4)
        (i32.const 8)
       )
      )
     )
     (block $label$8
      (block $label$9
       (br_if $label$9
        (i32.ge_u
         (tee_local $3
          (i32.add
           (i32.load
            (tee_local $0
             (i32.load offset=3283168
              (i32.const 0)
             )
            )
           )
           (i32.shl
            (tee_local $5
             (i32.load offset=8
              (get_local $0)
             )
            )
            (i32.const 10)
           )
          )
         )
         (i32.load offset=4
          (get_local $0)
         )
        )
       )
       (i32.store
        (i32.add
         (get_local $0)
         (i32.const 8)
        )
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (br_if $label$9
        (i32.eqz
         (get_local $3)
        )
       )
       (i32.store
        (get_local $3)
        (get_local $1)
       )
       (set_local $2
        (i32.add
         (get_local $3)
         (i32.const 4)
        )
       )
       (br $label$8)
      )
      (i32.store16
       (i32.add
        (get_local $1)
        (i32.const 2)
       )
       (i32.and
        (get_local $4)
        (i32.const 65495)
       )
      )
      (set_local $2
       (i32.const 67648)
      )
     )
     (set_local $3
      (i32.const 0)
     )
     (loop $label$10
      (block $label$11
       (block $label$12
        (block $label$13
         (br_if $label$13
          (i32.lt_s
           (tee_local $4
            (i32.load
             (tee_local $0
              (i32.load offset=3283164
               (i32.const 0)
              )
             )
            )
           )
           (i32.load offset=4
            (get_local $0)
           )
          )
         )
         (block $label$14
          (br_if $label$14
           (tee_local $5
            (call $_Z9getBufferPhj
             (i32.const 2233408)
             (i32.const 1048576)
            )
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $4
           (i32.const 0)
          )
          (br_if $label$12
           (i32.le_u
            (get_local $3)
            (i32.const 1017)
           )
          )
          (br $label$11)
         )
         (set_local $4
          (i32.const 0)
         )
         (i32.store
          (get_local $0)
          (i32.const 0)
         )
         (i32.store
          (i32.add
           (get_local $0)
           (i32.const 4)
          )
          (i32.add
           (get_local $5)
           (i32.const -1)
          )
         )
        )
        (i32.store
         (get_local $0)
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (set_local $5
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 2233408)
          )
         )
        )
        (i32.store
         (get_local $0)
         (i32.add
          (get_local $4)
          (i32.const 2)
         )
        )
        (set_local $4
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 2233409)
          )
         )
        )
        (br_if $label$11
         (i32.gt_u
          (get_local $3)
          (i32.const 1017)
         )
        )
       )
       (i32.store8
        (tee_local $0
         (i32.add
          (get_local $2)
          (get_local $3)
         )
        )
        (get_local $5)
       )
       (i32.store8
        (i32.add
         (get_local $0)
         (i32.const 1)
        )
        (get_local $4)
       )
       (set_local $3
        (i32.add
         (get_local $3)
         (i32.const 2)
        )
       )
      )
      (block $label$15
       (br_if $label$15
        (i32.eqz
         (i32.and
          (get_local $5)
          (i32.const 255)
         )
        )
       )
       (br_if $label$10
        (i32.and
         (get_local $4)
         (i32.const 255)
        )
       )
      )
     )
     (i32.store16 align=1
      (i32.add
       (i32.add
        (get_local $2)
        (get_local $3)
       )
       (i32.const 1)
      )
      (i32.const 0)
     )
     (set_local $4
      (i32.load16_u
       (i32.add
        (get_local $1)
        (i32.const 2)
       )
      )
     )
    )
    (block $label$16
     (br_if $label$16
      (i32.eqz
       (i32.and
        (get_local $4)
        (i32.const 256)
       )
      )
     )
     (set_local $2
      (i32.add
       (get_local $1)
       (i32.const 4)
      )
     )
     (set_local $3
      (i32.const 0)
     )
     (loop $label$17
      (block $label$18
       (block $label$19
        (block $label$20
         (br_if $label$20
          (i32.lt_s
           (tee_local $4
            (i32.load
             (tee_local $0
              (i32.load offset=3283164
               (i32.const 0)
              )
             )
            )
           )
           (i32.load offset=4
            (get_local $0)
           )
          )
         )
         (block $label$21
          (br_if $label$21
           (tee_local $5
            (call $_Z9getBufferPhj
             (i32.const 2233408)
             (i32.const 1048576)
            )
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $4
           (i32.const 0)
          )
          (br_if $label$19
           (i32.le_u
            (get_local $3)
            (i32.const 3)
           )
          )
          (br $label$18)
         )
         (set_local $4
          (i32.const 0)
         )
         (i32.store
          (get_local $0)
          (i32.const 0)
         )
         (i32.store
          (i32.add
           (get_local $0)
           (i32.const 4)
          )
          (i32.add
           (get_local $5)
           (i32.const -1)
          )
         )
        )
        (i32.store
         (get_local $0)
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (set_local $5
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 2233408)
          )
         )
        )
        (i32.store
         (get_local $0)
         (i32.add
          (get_local $4)
          (i32.const 2)
         )
        )
        (set_local $4
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 2233409)
          )
         )
        )
        (br_if $label$18
         (i32.gt_u
          (get_local $3)
          (i32.const 3)
         )
        )
       )
       (i32.store8
        (tee_local $0
         (i32.add
          (get_local $2)
          (get_local $3)
         )
        )
        (get_local $5)
       )
       (i32.store8
        (i32.add
         (get_local $0)
         (i32.const 1)
        )
        (get_local $4)
       )
       (set_local $3
        (i32.add
         (get_local $3)
         (i32.const 2)
        )
       )
      )
      (br_if $label$16
       (i32.eqz
        (i32.and
         (get_local $5)
         (i32.const 255)
        )
       )
      )
      (br_if $label$17
       (i32.and
        (get_local $4)
        (i32.const 255)
       )
      )
     )
    )
    (i32.store offset=1076
     (i32.const 0)
     (tee_local $0
      (i32.add
       (tee_local $4
        (i32.load offset=1076
         (i32.const 0)
        )
       )
       (i32.const 16)
      )
     )
    )
    (br_if $label$1
     (tee_local $1
      (select
       (i32.const 0)
       (i32.add
        (get_local $4)
        (i32.load offset=3283016
         (i32.const 0)
        )
       )
       (i32.gt_u
        (get_local $0)
        (i32.load offset=1080
         (i32.const 0)
        )
       )
      )
     )
    )
   )
   (call $_Z11memoryBoundv)
  )
  (i32.load offset=3283172
   (i32.const 0)
  )
 )
 (func $_ZN11LibraryFile3GetER8MoveNode (; 54 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $7
   (i32.const 0)
  )
  (i32.store16 offset=2
   (get_local $1)
   (i32.const 0)
  )
  (set_local $5
   (i32.const 225)
  )
  (i32.store8
   (get_local $1)
   (i32.const 225)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (tee_local $4
       (i32.load
        (get_local $0)
       )
      )
      (tee_local $3
       (i32.load offset=4
        (get_local $0)
       )
      )
     )
    )
    (br_if $label$0
     (i32.eqz
      (tee_local $2
       (call $_Z9getBufferPhj
        (i32.const 2233408)
        (i32.const 1048576)
       )
      )
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (i32.store
     (get_local $0)
     (i32.const 0)
    )
    (i32.store
     (i32.add
      (get_local $0)
      (i32.const 4)
     )
     (tee_local $3
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
   )
   (set_local $7
    (i32.const 1)
   )
   (i32.store
    (get_local $0)
    (i32.add
     (get_local $4)
     (i32.const 1)
    )
   )
   (set_local $2
    (i32.load8_u
     (i32.add
      (get_local $4)
      (i32.const 2233408)
     )
    )
   )
   (i32.store
    (get_local $0)
    (tee_local $6
     (i32.add
      (get_local $4)
      (i32.const 2)
     )
    )
   )
   (set_local $4
    (i32.load8_u
     (i32.add
      (get_local $4)
      (i32.const 2233409)
     )
    )
   )
   (block $label$2
    (br_if $label$2
     (i32.eqz
      (get_local $2)
     )
    )
    (set_local $5
     (i32.add
      (i32.add
       (i32.and
        (get_local $2)
        (i32.const 15)
       )
       (i32.mul
        (i32.shr_u
         (get_local $2)
         (i32.const 4)
        )
        (i32.const 15)
       )
      )
      (i32.const 255)
     )
    )
   )
   (i32.store8
    (get_local $1)
    (get_local $5)
   )
   (i32.store16
    (tee_local $2
     (i32.add
      (get_local $1)
      (i32.const 2)
     )
    )
    (tee_local $4
     (i32.or
      (i32.and
       (i32.load16_u
        (get_local $2)
       )
       (i32.const -256)
      )
      (get_local $4)
     )
    )
   )
   (br_if $label$0
    (i32.eqz
     (i32.and
      (get_local $4)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (block $label$4
     (block $label$5
      (br_if $label$5
       (i32.lt_s
        (get_local $6)
        (get_local $3)
       )
      )
      (br_if $label$4
       (i32.eqz
        (tee_local $4
         (call $_Z9getBufferPhj
          (i32.const 2233408)
          (i32.const 1048576)
         )
        )
       )
      )
      (set_local $6
       (i32.const 0)
      )
      (i32.store
       (get_local $0)
       (i32.const 0)
      )
      (i32.store
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
       (i32.add
        (get_local $4)
        (i32.const -1)
       )
      )
     )
     (i32.store
      (get_local $0)
      (i32.add
       (get_local $6)
       (i32.const 2)
      )
     )
     (set_local $0
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 2233409)
       )
      )
     )
     (set_local $7
      (i32.const 1)
     )
     (br $label$3)
    )
    (set_local $0
     (i32.const 0)
    )
    (set_local $7
     (i32.const 0)
    )
   )
   (i32.store16
    (tee_local $1
     (i32.add
      (get_local $1)
      (i32.const 2)
     )
    )
    (i32.or
     (i32.shl
      (get_local $0)
      (i32.const 8)
     )
     (i32.load8_u
      (get_local $1)
     )
    )
   )
  )
  (get_local $7)
 )
 (func $_Z15createRenjuTreev (; 55 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (i32.store offset=904
   (i32.load offset=3283160
    (i32.const 0)
   )
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $1
       (i32.load offset=3283172
        (i32.const 0)
       )
      )
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (set_local $7
     (tee_local $5
      (i32.load offset=3283152
       (i32.const 0)
      )
     )
    )
    (loop $label$2
     (set_local $0
      (i32.add
       (get_local $5)
       (i32.const 16)
      )
     )
     (block $label$3
      (br_if $label$3
       (i32.rem_u
        (get_local $4)
        (i32.const 300000)
       )
      )
      (call $_Z7loadingjj
       (get_local $4)
       (get_local $1)
      )
     )
     (block $label$4
      (br_if $label$4
       (i32.eq
        (tee_local $1
         (i32.load8_u
          (get_local $0)
         )
        )
        (i32.const 225)
       )
      )
      (br_if $label$0
       (i32.gt_u
        (get_local $1)
        (i32.const 225)
       )
      )
      (set_local $6
       (i32.add
        (get_local $7)
        (i32.const 8)
       )
      )
      (block $label$5
       (block $label$6
        (block $label$7
         (block $label$8
          (block $label$9
           (block $label$10
            (block $label$11
             (br_if $label$11
              (i32.eqz
               (tee_local $2
                (i32.load offset=8
                 (get_local $7)
                )
               )
              )
             )
             (block $label$12
              (block $label$13
               (block $label$14
                (block $label$15
                 (br_if $label$15
                  (i32.ne
                   (tee_local $3
                    (i32.load8_u
                     (get_local $2)
                    )
                   )
                   (get_local $1)
                  )
                 )
                 (br_if $label$13
                  (i32.load offset=4
                   (tee_local $7
                    (get_local $2)
                   )
                  )
                 )
                 (br $label$14)
                )
                (set_local $7
                 (get_local $2)
                )
                (loop $label$16
                 (br_if $label$12
                  (i32.eqz
                   (tee_local $7
                    (i32.load offset=12
                     (get_local $7)
                    )
                   )
                  )
                 )
                 (br_if $label$16
                  (i32.ne
                   (i32.load8_u
                    (get_local $7)
                   )
                   (get_local $1)
                  )
                 )
                )
                (br_if $label$13
                 (i32.load offset=4
                  (get_local $7)
                 )
                )
               )
               (i32.store
                (i32.add
                 (get_local $7)
                 (i32.const 4)
                )
                (i32.load
                 (i32.add
                  (get_local $5)
                  (i32.const 20)
                 )
                )
               )
              )
              (block $label$17
               (br_if $label$17
                (i32.eqz
                 (i32.and
                  (tee_local $1
                   (i32.load16_u
                    (tee_local $2
                     (i32.add
                      (get_local $5)
                      (i32.const 18)
                     )
                    )
                   )
                  )
                  (i32.const 16)
                 )
                )
               )
               (br_if $label$10
                (i32.eqz
                 (i32.and
                  (tee_local $6
                   (i32.load16_u offset=2
                    (get_local $7)
                   )
                  )
                  (i32.const 16)
                 )
                )
               )
              )
              (br_if $label$9
               (i32.eqz
                (i32.and
                 (get_local $1)
                 (i32.const 2)
                )
               )
              )
              (br $label$8)
             )
             (block $label$18
              (br_if $label$18
               (i32.ge_u
                (get_local $1)
                (get_local $3)
               )
              )
              (i32.store
               (i32.add
                (get_local $5)
                (i32.const 28)
               )
               (get_local $2)
              )
              (br $label$11)
             )
             (loop $label$19
              (set_local $6
               (i32.add
                (get_local $2)
                (i32.const 12)
               )
              )
              (br_if $label$11
               (i32.eqz
                (tee_local $2
                 (i32.load offset=12
                  (get_local $2)
                 )
                )
               )
              )
              (br_if $label$19
               (i32.ge_u
                (get_local $1)
                (i32.load8_u
                 (get_local $2)
                )
               )
              )
             )
             (i32.store
              (i32.add
               (get_local $5)
               (i32.const 28)
              )
              (get_local $2)
             )
            )
            (i32.store
             (get_local $6)
             (get_local $0)
            )
            (set_local $7
             (get_local $0)
            )
            (br $label$5)
           )
           (i32.store16
            (i32.add
             (get_local $7)
             (i32.const 2)
            )
            (i32.or
             (get_local $6)
             (i32.const 16)
            )
           )
           (br_if $label$8
            (i32.and
             (tee_local $1
              (i32.load16_u
               (get_local $2)
              )
             )
             (i32.const 2)
            )
           )
          )
          (br_if $label$7
           (i32.and
            (tee_local $6
             (i32.load16_u offset=2
              (get_local $7)
             )
            )
            (i32.const 2)
           )
          )
         )
         (br_if $label$6
          (i32.and
           (get_local $1)
           (i32.const 4)
          )
         )
         (br $label$5)
        )
        (i32.store16
         (i32.add
          (get_local $7)
          (i32.const 2)
         )
         (i32.and
          (get_local $6)
          (i32.const 65533)
         )
        )
        (br_if $label$5
         (i32.eqz
          (i32.and
           (i32.load16_u
            (get_local $2)
           )
           (i32.const 4)
          )
         )
        )
       )
       (br_if $label$5
        (i32.and
         (tee_local $1
          (i32.load16_u offset=2
           (get_local $7)
          )
         )
         (i32.const 4)
        )
       )
       (i32.store16
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
        (i32.or
         (get_local $1)
         (i32.const 4)
        )
       )
      )
      (i32.store offset=904
       (tee_local $1
        (i32.load offset=3283160
         (i32.const 0)
        )
       )
       (tee_local $2
        (i32.add
         (i32.load offset=904
          (get_local $1)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store
       (i32.add
        (get_local $1)
        (i32.shl
         (get_local $2)
         (i32.const 2)
        )
       )
       (get_local $7)
      )
     )
     (block $label$20
      (br_if $label$20
       (i32.eqz
        (i32.and
         (tee_local $1
          (i32.load16_u
           (i32.add
            (get_local $5)
            (i32.const 18)
           )
          )
         )
         (i32.const 128)
        )
       )
      )
      (br_if $label$20
       (i32.lt_s
        (tee_local $5
         (i32.load offset=904
          (i32.load offset=3283160
           (i32.const 0)
          )
         )
        )
        (i32.const 1)
       )
      )
      (i32.store
       (i32.add
        (tee_local $2
         (i32.load offset=3283156
          (i32.const 0)
         )
        )
        (i32.shl
         (i32.load offset=1800
          (get_local $2)
         )
         (i32.const 3)
        )
       )
       (get_local $5)
      )
      (i32.store offset=1800
       (get_local $2)
       (i32.add
        (tee_local $5
         (i32.load offset=1800
          (get_local $2)
         )
        )
        (i32.const 1)
       )
      )
      (i32.store offset=4
       (i32.add
        (get_local $2)
        (i32.shl
         (get_local $5)
         (i32.const 3)
        )
       )
       (i32.const 0)
      )
     )
     (block $label$21
      (br_if $label$21
       (i32.eqz
        (i32.and
         (get_local $1)
         (i32.const 64)
        )
       )
      )
      (block $label$22
       (block $label$23
        (br_if $label$23
         (i32.eqz
          (tee_local $1
           (i32.load offset=1800
            (tee_local $7
             (i32.load offset=3283156
              (i32.const 0)
             )
            )
           )
          )
         )
        )
        (i32.store
         (i32.add
          (get_local $7)
          (i32.const 1800)
         )
         (tee_local $1
          (i32.add
           (get_local $1)
           (i32.const -1)
          )
         )
        )
        (i32.store offset=904
         (tee_local $2
          (i32.load offset=3283160
           (i32.const 0)
          )
         )
         (tee_local $7
          (i32.add
           (i32.load
            (i32.add
             (get_local $7)
             (i32.shl
              (get_local $1)
              (i32.const 3)
             )
            )
           )
           (i32.const -1)
          )
         )
        )
        (set_local $7
         (i32.add
          (get_local $2)
          (i32.shl
           (get_local $7)
           (i32.const 2)
          )
         )
        )
        (br $label$22)
       )
       (i32.store offset=904
        (tee_local $7
         (i32.load offset=3283160
          (i32.const 0)
         )
        )
        (i32.const 0)
       )
      )
      (set_local $7
       (i32.load
        (get_local $7)
       )
      )
     )
     (set_local $5
      (get_local $0)
     )
     (br_if $label$2
      (i32.lt_u
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (tee_local $1
        (i32.load offset=3283172
         (i32.const 0)
        )
       )
      )
     )
    )
    (return
     (i32.const 1)
    )
   )
   (return
    (i32.const 1)
   )
  )
  (i32.const 0)
 )
 (func $_Z4initv (; 56 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $0
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $4
    (i32.const 10)
   )
   (set_local $3
    (i32.const 0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $2
        (i32.add
         (get_local $0)
         (get_local $3)
        )
       )
       (i32.const 134208)
      )
      (get_local $4)
     )
     (set_local $1
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
       (i32.const 1048574)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 3283184)
       )
      )
     )
     (set_local $2
      (i32.ne
       (get_local $3)
       (i32.const 12)
      )
     )
     (set_local $3
      (get_local $1)
     )
     (br_if $label$2
      (get_local $2)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $3
     (i32.add
      (get_local $0)
      (get_local $1)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $3)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (i32.store offset=1080
   (i32.const 0)
   (i32.const 1048576)
  )
  (i32.store offset=3283008
   (i32.const 0)
   (i32.const 5380160)
  )
  (i32.store offset=1064
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1060
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1068
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1072
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=3283012
   (i32.const 0)
   (i32.const 7478336)
  )
  (i32.store offset=3283016
   (i32.const 0)
   (i32.const 7480384)
  )
  (i32.store8 offset=134208
   (i32.const 0)
   (i32.const 10)
  )
  (i32.store8 offset=134209
   (i32.const 0)
   (i32.const 114)
  )
  (i32.store8 offset=134210
   (i32.const 0)
   (i32.const 101)
  )
  (i32.store8 offset=134211
   (i32.const 0)
   (i32.const 115)
  )
  (i32.store8 offset=134212
   (i32.const 0)
   (i32.const 101)
  )
  (i32.store8 offset=134213
   (i32.const 0)
   (i32.const 116)
  )
  (i32.store8 offset=134214
   (i32.const 0)
   (i32.const 32)
  )
  (i32.store8 offset=134215
   (i32.const 0)
   (i32.const 109)
  )
  (i32.store8 offset=134216
   (i32.const 0)
   (i32.const 95)
  )
  (i32.store8 offset=134217
   (i32.const 0)
   (i32.const 83)
  )
  (i32.store8 offset=134218
   (i32.const 0)
   (i32.const 116)
  )
  (i32.store8 offset=134219
   (i32.const 0)
   (i32.const 97)
  )
  (i32.store8 offset=134220
   (i32.const 0)
   (i32.const 99)
  )
  (i32.store8 offset=134221
   (i32.const 0)
   (i32.const 107)
  )
  (i32.store offset=1060
   (i32.const 0)
   (i32.const 14)
  )
  (i32.store8 offset=134222
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=3283156
   (i32.const 0)
   (i32.const 7480384)
  )
  (i32.store offset=3283160
   (i32.const 0)
   (i32.const 7482188)
  )
  (i32.store offset=3283164
   (i32.const 0)
   (i32.const 7483096)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 2740)
  )
  (i32.store offset=3283168
   (i32.const 0)
   (i32.const 7483112)
  )
  (i32.const 32)
 )
 (func $_Z12setMemoryEndj (; 57 ;) (param $0 i32)
  (i32.store offset=1080
   (i32.const 0)
   (get_local $0)
  )
 )
 (func $_Z11pushSGFCharc (; 58 ;) (param $0 i32)
  (local $1 i32)
  (i32.store offset=3283200
   (i32.const 0)
   (i32.add
    (tee_local $1
     (i32.load offset=3283200
      (i32.const 0)
     )
    )
    (i32.const 1)
   )
  )
  (i32.store8
   (i32.add
    (get_local $1)
    (i32.load offset=3283204
     (i32.const 0)
    )
   )
   (get_local $0)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (tee_local $0
      (i32.load offset=3283200
       (i32.const 0)
      )
     )
     (i32.const 1024)
    )
   )
   (call $_Z14outputSGFCachePcj
    (i32.load offset=3283204
     (i32.const 0)
    )
    (get_local $0)
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.const 0)
   )
  )
 )
 (func $_Z7lib2sgfv (; 59 ;)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (i32.store offset=4
   (i32.const 0)
   (tee_local $10
    (i32.sub
     (i32.load offset=4
      (i32.const 0)
     )
     (i32.const 240)
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (call $_Z15createSGFBufferj
      (i32.shl
       (i32.load offset=3283172
        (i32.const 0)
       )
       (i32.const 3)
      )
     )
    )
   )
   (set_local $0
    (call $memset
     (get_local $10)
     (i32.const 0)
     (i32.const 228)
    )
   )
   (set_local $8
    (i32.load offset=8
     (i32.load offset=3283152
      (i32.const 0)
     )
    )
   )
   (drop
    (call $memset
     (i32.load offset=3283156
      (i32.const 0)
     )
     (i32.const 0)
     (i32.const 1804)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.const 1)
   )
   (i32.store8
    (i32.load offset=3283204
     (i32.const 0)
    )
    (i32.const 40)
   )
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.lt_u
       (tee_local $5
        (i32.load offset=3283200
         (i32.const 0)
        )
       )
       (i32.const 1024)
      )
     )
     (set_local $9
      (i32.const 0)
     )
     (call $_Z14outputSGFCachePcj
      (i32.load offset=3283204
       (i32.const 0)
      )
      (get_local $5)
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.const 0)
     )
     (br $label$1)
    )
    (set_local $9
     (get_local $5)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 59)
   )
   (block $label$3
    (br_if $label$3
     (i32.lt_u
      (tee_local $9
       (i32.load offset=3283200
        (i32.const 0)
       )
      )
      (i32.const 1024)
     )
    )
    (call $_Z14outputSGFCachePcj
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.store offset=3283200
     (i32.const 0)
     (i32.const 0)
    )
    (set_local $9
     (i32.const 0)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 83)
   )
   (block $label$4
    (block $label$5
     (br_if $label$5
      (i32.lt_u
       (tee_local $5
        (i32.load offset=3283200
         (i32.const 0)
        )
       )
       (i32.const 1024)
      )
     )
     (set_local $9
      (i32.const 0)
     )
     (call $_Z14outputSGFCachePcj
      (i32.load offset=3283204
       (i32.const 0)
      )
      (get_local $5)
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.const 0)
     )
     (br $label$4)
    )
    (set_local $9
     (get_local $5)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 90)
   )
   (block $label$6
    (br_if $label$6
     (i32.lt_u
      (tee_local $9
       (i32.load offset=3283200
        (i32.const 0)
       )
      )
      (i32.const 1024)
     )
    )
    (call $_Z14outputSGFCachePcj
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.store offset=3283200
     (i32.const 0)
     (i32.const 0)
    )
    (set_local $9
     (i32.const 0)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 91)
   )
   (block $label$7
    (block $label$8
     (br_if $label$8
      (i32.lt_u
       (tee_local $5
        (i32.load offset=3283200
         (i32.const 0)
        )
       )
       (i32.const 1024)
      )
     )
     (set_local $9
      (i32.const 0)
     )
     (call $_Z14outputSGFCachePcj
      (i32.load offset=3283204
       (i32.const 0)
      )
      (get_local $5)
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.const 0)
     )
     (br $label$7)
    )
    (set_local $9
     (get_local $5)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 49)
   )
   (block $label$9
    (br_if $label$9
     (i32.lt_u
      (tee_local $9
       (i32.load offset=3283200
        (i32.const 0)
       )
      )
      (i32.const 1024)
     )
    )
    (call $_Z14outputSGFCachePcj
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.store offset=3283200
     (i32.const 0)
     (i32.const 0)
    )
    (set_local $9
     (i32.const 0)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 53)
   )
   (block $label$10
    (block $label$11
     (br_if $label$11
      (i32.lt_u
       (tee_local $5
        (i32.load offset=3283200
         (i32.const 0)
        )
       )
       (i32.const 1024)
      )
     )
     (set_local $9
      (i32.const 0)
     )
     (call $_Z14outputSGFCachePcj
      (i32.load offset=3283204
       (i32.const 0)
      )
      (get_local $5)
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.const 0)
     )
     (br $label$10)
    )
    (set_local $9
     (get_local $5)
    )
   )
   (set_local $3
    (i32.const 0)
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.const 93)
   )
   (block $label$12
    (block $label$13
     (block $label$14
      (br_if $label$14
       (i32.lt_u
        (tee_local $9
         (i32.load offset=3283200
          (i32.const 0)
         )
        )
        (i32.const 1024)
       )
      )
      (set_local $2
       (i32.const 0)
      )
      (call $_Z14outputSGFCachePcj
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $9)
      )
      (i32.store offset=3283200
       (i32.const 0)
       (i32.const 0)
      )
      (br_if $label$13
       (get_local $8)
      )
      (br $label$12)
     )
     (set_local $2
      (get_local $9)
     )
     (br_if $label$12
      (i32.eqz
       (get_local $8)
      )
     )
    )
    (set_local $3
     (i32.const 0)
    )
    (set_local $9
     (i32.const 1)
    )
    (loop $label$15
     (set_local $2
      (i32.add
       (get_local $0)
       (get_local $9)
      )
     )
     (block $label$16
      (br_if $label$16
       (i32.eqz
        (tee_local $1
         (i32.load offset=12
          (get_local $8)
         )
        )
       )
      )
      (i32.store
       (i32.add
        (tee_local $5
         (i32.load offset=3283156
          (i32.const 0)
         )
        )
        (i32.shl
         (i32.load offset=1800
          (get_local $5)
         )
         (i32.const 3)
        )
       )
       (get_local $9)
      )
      (i32.store offset=1800
       (get_local $5)
       (i32.add
        (tee_local $4
         (i32.load offset=1800
          (get_local $5)
         )
        )
        (i32.const 1)
       )
      )
      (i32.store offset=4
       (i32.add
        (get_local $5)
        (i32.shl
         (get_local $4)
         (i32.const 3)
        )
       )
       (get_local $1)
      )
      (i32.store8
       (get_local $2)
       (i32.const 1)
      )
     )
     (set_local $4
      (i32.const 0)
     )
     (set_local $7
      (i32.const 0)
     )
     (block $label$17
      (br_if $label$17
       (i32.eq
        (tee_local $5
         (i32.load8_u
          (get_local $8)
         )
        )
        (i32.const 225)
       )
      )
      (set_local $7
       (i32.add
        (i32.div_u
         (get_local $5)
         (i32.const 15)
        )
        (i32.const 1)
       )
      )
      (set_local $4
       (i32.add
        (i32.rem_u
         (get_local $5)
         (i32.const 15)
        )
        (i32.const 1)
       )
      )
     )
     (set_local $6
      (i32.and
       (get_local $9)
       (i32.const 1)
      )
     )
     (block $label$18
      (block $label$19
       (block $label$20
        (br_if $label$20
         (i32.eqz
          (tee_local $1
           (i32.load8_u
            (get_local $2)
           )
          )
         )
        )
        (i32.store offset=3283200
         (i32.const 0)
         (i32.add
          (tee_local $5
           (i32.load offset=3283200
            (i32.const 0)
           )
          )
          (i32.const 1)
         )
        )
        (i32.store8
         (i32.add
          (get_local $5)
          (i32.load offset=3283204
           (i32.const 0)
          )
         )
         (i32.const 40)
        )
        (br_if $label$19
         (i32.lt_u
          (tee_local $2
           (i32.load offset=3283200
            (i32.const 0)
           )
          )
          (i32.const 1024)
         )
        )
        (set_local $5
         (i32.const 0)
        )
        (call $_Z14outputSGFCachePcj
         (i32.load offset=3283204
          (i32.const 0)
         )
         (get_local $2)
        )
        (i32.store offset=3283200
         (i32.const 0)
         (i32.const 0)
        )
        (br $label$18)
       )
       (set_local $5
        (i32.load offset=3283200
         (i32.const 0)
        )
       )
       (br $label$18)
      )
      (set_local $5
       (get_local $2)
      )
     )
     (set_local $2
      (select
       (i32.const 66)
       (i32.const 87)
       (get_local $6)
      )
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $5)
      )
      (i32.const 59)
     )
     (block $label$21
      (block $label$22
       (br_if $label$22
        (i32.lt_u
         (tee_local $6
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $5
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $6)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (br $label$21)
      )
      (set_local $5
       (get_local $6)
      )
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $5)
      )
      (get_local $2)
     )
     (block $label$23
      (block $label$24
       (br_if $label$24
        (i32.lt_u
         (tee_local $2
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $5
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $2)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (br $label$23)
      )
      (set_local $5
       (get_local $2)
      )
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $5)
      )
      (i32.const 91)
     )
     (block $label$25
      (block $label$26
       (br_if $label$26
        (i32.lt_u
         (tee_local $2
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $5
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $2)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (br $label$25)
      )
      (set_local $5
       (get_local $2)
      )
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $5)
      )
      (i32.load8_u
       (i32.add
        (i32.and
         (get_local $4)
         (i32.const 255)
        )
        (i32.const 3283215)
       )
      )
     )
     (block $label$27
      (block $label$28
       (br_if $label$28
        (i32.lt_u
         (tee_local $2
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $5
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $2)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (br $label$27)
      )
      (set_local $5
       (get_local $2)
      )
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $5)
      )
      (i32.load8_u
       (i32.add
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
        (i32.const 3283215)
       )
      )
     )
     (block $label$29
      (block $label$30
       (br_if $label$30
        (i32.lt_u
         (tee_local $2
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $5
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $2)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (br $label$29)
      )
      (set_local $5
       (get_local $2)
      )
     )
     (i32.store offset=3283200
      (i32.const 0)
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=3283204
        (i32.const 0)
       )
       (get_local $5)
      )
      (i32.const 93)
     )
     (block $label$31
      (block $label$32
       (br_if $label$32
        (i32.lt_u
         (tee_local $5
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $2
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $5)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (br $label$31)
      )
      (set_local $2
       (get_local $5)
      )
     )
     (set_local $3
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (block $label$33
      (br_if $label$33
       (i32.eqz
        (tee_local $8
         (i32.load
          (i32.add
           (get_local $8)
           (i32.const 8)
          )
         )
        )
       )
      )
      (set_local $9
       (i32.add
        (get_local $9)
        (i32.const 1)
       )
      )
      (br_if $label$15
       (get_local $8)
      )
      (br $label$12)
     )
     (block $label$34
      (br_if $label$34
       (i32.eqz
        (tee_local $4
         (i32.load offset=1800
          (tee_local $5
           (i32.load offset=3283156
            (i32.const 0)
           )
          )
         )
        )
       )
      )
      (i32.store
       (i32.add
        (get_local $5)
        (i32.const 1800)
       )
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const -1)
        )
       )
      )
      (set_local $8
       (i32.load offset=4
        (tee_local $5
         (i32.add
          (get_local $5)
          (i32.shl
           (get_local $4)
           (i32.const 3)
          )
         )
        )
       )
      )
      (block $label$35
       (br_if $label$35
        (i32.le_s
         (get_local $9)
         (tee_local $4
          (i32.load
           (get_local $5)
          )
         )
        )
       )
       (loop $label$36
        (set_local $5
         (i32.add
          (get_local $0)
          (get_local $9)
         )
        )
        (block $label$37
         (br_if $label$37
          (i32.eqz
           (i32.and
            (get_local $1)
            (i32.const 255)
           )
          )
         )
         (i32.store offset=3283200
          (i32.const 0)
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
         (i32.store8
          (i32.add
           (i32.load offset=3283204
            (i32.const 0)
           )
           (get_local $2)
          )
          (i32.const 41)
         )
         (block $label$38
          (block $label$39
           (br_if $label$39
            (i32.lt_u
             (tee_local $1
              (i32.load offset=3283200
               (i32.const 0)
              )
             )
             (i32.const 1024)
            )
           )
           (set_local $2
            (i32.const 0)
           )
           (call $_Z14outputSGFCachePcj
            (i32.load offset=3283204
             (i32.const 0)
            )
            (get_local $1)
           )
           (i32.store offset=3283200
            (i32.const 0)
            (i32.const 0)
           )
           (br $label$38)
          )
          (set_local $2
           (get_local $1)
          )
         )
         (i32.store8
          (get_local $5)
          (i32.const 0)
         )
        )
        (br_if $label$35
         (i32.le_s
          (tee_local $9
           (i32.add
            (get_local $9)
            (i32.const -1)
           )
          )
          (get_local $4)
         )
        )
        (set_local $1
         (i32.load8_u
          (i32.add
           (get_local $5)
           (i32.const -1)
          )
         )
        )
        (br $label$36)
       )
      )
      (i32.store offset=3283200
       (i32.const 0)
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (i32.store8
       (i32.add
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $2)
       )
       (i32.const 41)
      )
      (block $label$40
       (br_if $label$40
        (i32.lt_u
         (tee_local $9
          (i32.load offset=3283200
           (i32.const 0)
          )
         )
         (i32.const 1024)
        )
       )
       (set_local $2
        (i32.const 0)
       )
       (call $_Z14outputSGFCachePcj
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $9)
       )
       (i32.store offset=3283200
        (i32.const 0)
        (i32.const 0)
       )
       (set_local $9
        (get_local $4)
       )
       (br_if $label$15
        (get_local $8)
       )
       (br $label$12)
      )
      (set_local $2
       (get_local $9)
      )
      (set_local $9
       (get_local $4)
      )
      (br_if $label$15
       (get_local $8)
      )
      (br $label$12)
     )
    )
    (br_if $label$12
     (i32.lt_s
      (get_local $9)
      (i32.const 0)
     )
    )
    (loop $label$41
     (set_local $5
      (i32.add
       (get_local $0)
       (get_local $9)
      )
     )
     (block $label$42
      (br_if $label$42
       (i32.eqz
        (i32.and
         (get_local $1)
         (i32.const 255)
        )
       )
      )
      (i32.store offset=3283200
       (i32.const 0)
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (i32.store8
       (i32.add
        (i32.load offset=3283204
         (i32.const 0)
        )
        (get_local $2)
       )
       (i32.const 41)
      )
      (block $label$43
       (block $label$44
        (br_if $label$44
         (i32.lt_u
          (tee_local $1
           (i32.load offset=3283200
            (i32.const 0)
           )
          )
          (i32.const 1024)
         )
        )
        (set_local $2
         (i32.const 0)
        )
        (call $_Z14outputSGFCachePcj
         (i32.load offset=3283204
          (i32.const 0)
         )
         (get_local $1)
        )
        (i32.store offset=3283200
         (i32.const 0)
         (i32.const 0)
        )
        (br $label$43)
       )
       (set_local $2
        (get_local $1)
       )
      )
      (i32.store8
       (get_local $5)
       (i32.const 0)
      )
     )
     (br_if $label$12
      (i32.lt_s
       (get_local $9)
       (i32.const 1)
      )
     )
     (set_local $9
      (i32.add
       (get_local $9)
       (i32.const -1)
      )
     )
     (set_local $1
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const -1)
       )
      )
     )
     (br $label$41)
    )
   )
   (i32.store offset=3283200
    (i32.const 0)
    (i32.add
     (get_local $2)
     (i32.const 1)
    )
   )
   (i32.store8
    (i32.add
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $2)
    )
    (i32.const 41)
   )
   (block $label$45
    (br_if $label$45
     (i32.lt_u
      (tee_local $9
       (i32.load offset=3283200
        (i32.const 0)
       )
      )
      (i32.const 1024)
     )
    )
    (call $_Z14outputSGFCachePcj
     (i32.load offset=3283204
      (i32.const 0)
     )
     (get_local $9)
    )
    (i32.store offset=3283200
     (i32.const 0)
     (i32.const 0)
    )
    (set_local $9
     (i32.const 0)
    )
   )
   (call $_Z14outputSGFCachePcj
    (i32.load offset=3283204
     (i32.const 0)
    )
    (get_local $9)
   )
   (i32.store offset=1088
    (i32.const 0)
    (get_local $3)
   )
  )
  (i32.store offset=4
   (i32.const 0)
   (i32.add
    (get_local $10)
    (i32.const 240)
   )
  )
 )
)
