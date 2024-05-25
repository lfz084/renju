(module
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (import "env" "memset" (func $memset (param i32 i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 5)
 (data (i32.const 16) "\0f")
 (data (i32.const 32) "\02")
 (data (i32.const 287264) " b\03\00")
 (data (i32.const 287280) "\00\02\01")
 (export "memory" (memory $0))
 (export "_Z11getInBufferv" (func $_Z11getInBufferv))
 (export "_Z12getOutBufferv" (func $_Z12getOutBufferv))
 (export "_Z10getVcfInfov" (func $_Z10getVcfInfov))
 (export "_Z14getVcfWinMovesv" (func $_Z14getVcfWinMovesv))
 (export "_Z11getVcfMovesv" (func $_Z11getVcfMovesv))
 (export "_Z10copyBufferPhS_l" (func $_Z10copyBufferPhS_l))
 (export "_Z10copyBufferPtS_l" (func $_Z10copyBufferPtS_l))
 (export "_Z10copyBufferPjS_l" (func $_Z10copyBufferPjS_l))
 (export "_Z9setBufferPhlh" (func $_Z9setBufferPhlh))
 (export "_Z9setBufferPtlt" (func $_Z9setBufferPtlt))
 (export "_Z9setBufferPjlj" (func $_Z9setBufferPjlj))
 (export "_Z16createEmptyListsv" (func $_Z16createEmptyListsv))
 (export "_Z14createIdxListsv" (func $_Z14createIdxListsv))
 (export "_Z14createIdxTablev" (func $_Z14createIdxTablev))
 (export "_Z7moveIdxhch" (func $_Z7moveIdxhch))
 (export "_Z11getArrValuehchPc" (func $_Z11getArrValuehchPc))
 (export "_Z20createAroundIdxTablev" (func $_Z20createAroundIdxTablev))
 (export "_Z9aroundIdxhh" (func $_Z9aroundIdxhh))
 (export "_Z17getAroundIdxCounthh" (func $_Z17getAroundIdxCounthh))
 (export "_Z11isChildMovePhhS_h" (func $_Z11isChildMovePhhS_h))
 (export "_Z12isRepeatMovePhS_h" (func $_Z12isRepeatMovePhS_h))
 (export "_Z4inithh" (func $_Z4inithh))
 (export "_Z8testLinehhcPc" (func $_Z8testLinehhcPc))
 (export "_Z12testLineFoulhhcPc" (func $_Z12testLineFoulhhcPc))
 (export "_Z12testLineFourhhcPc" (func $_Z12testLineFourhhcPc))
 (export "_Z13testLineThreehhcPc" (func $_Z13testLineThreehhcPc))
 (export "_Z13testLinePointhhcPcPt" (func $_Z13testLinePointhhcPcPt))
 (export "_Z17testLinePointFourhhcPcPt" (func $_Z17testLinePointFourhhcPcPt))
 (export "_Z18testLinePointThreehhcPcPt" (func $_Z18testLinePointThreehhcPcPt))
 (export "_Z17getBlockFourPointhPct" (func $_Z17getBlockFourPointhPct))
 (export "_Z19getBlockThreePointshPct" (func $_Z19getBlockThreePointshPct))
 (export "_Z16getFreeFourPointhPct" (func $_Z16getFreeFourPointhPct))
 (export "_Z6isFoulhPc" (func $_Z6isFoulhPc))
 (export "_Z13testPointFourhcPc" (func $_Z13testPointFourhcPc))
 (export "_Z8testFivePccPt" (func $_Z8testFivePccPt))
 (export "_Z8testFourPccPt" (func $_Z8testFourPccPt))
 (export "_Z9testThreePccPt" (func $_Z9testThreePccPt))
 (export "_Z10isGameOverPcc" (func $_Z10isGameOverPcc))
 (export "_Z8getLevelPcc" (func $_Z8getLevelPcc))
 (export "_Z13getLevelPointhcPc" (func $_Z13getLevelPointhcPc))
 (export "_Z5isVCFcPcPhh" (func $_Z5isVCFcPcPhh))
 (export "_Z9simpleVCFcPcPhRh" (func $_Z9simpleVCFcPcPhRh))
 (export "_Z17getBlockVCFBufferv" (func $_Z17getBlockVCFBufferv))
 (export "_Z11getBlockVCFPccPhhb" (func $_Z11getBlockVCFPccPhhb))
 (func $_Z11getInBufferv (; 1 ;) (result i32)
  (i32.const 64)
 )
 (func $_Z12getOutBufferv (; 2 ;) (result i32)
  (i32.const 48)
 )
 (func $_Z10getVcfInfov (; 3 ;) (result i32)
  (i32.const 221680)
 )
 (func $_Z14getVcfWinMovesv (; 4 ;) (result i32)
  (i32.const 221712)
 )
 (func $_Z11getVcfMovesv (; 5 ;) (result i32)
  (i32.const 152960)
 )
 (func $_Z10copyBufferPhS_l (; 6 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (set_local $3
    (i32.const 0)
   )
   (loop $label$1
    (i32.store8
     (i32.add
      (get_local $0)
      (get_local $3)
     )
     (i32.load8_u
      (i32.add
       (get_local $1)
       (get_local $3)
      )
     )
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $3
       (i32.add
        (get_local $3)
        (i32.const 2)
       )
      )
      (get_local $2)
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.const 1)
   )
   (loop $label$2
    (i32.store8
     (i32.add
      (get_local $0)
      (get_local $3)
     )
     (i32.load8_u
      (i32.add
       (get_local $1)
       (get_local $3)
      )
     )
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $3
       (i32.add
        (get_local $3)
        (i32.const 2)
       )
      )
      (get_local $2)
     )
    )
   )
  )
 )
 (func $_Z10copyBufferPtS_l (; 7 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (set_local $3
    (get_local $0)
   )
   (set_local $4
    (get_local $1)
   )
   (loop $label$1
    (i32.store16
     (get_local $3)
     (i32.load16_u
      (get_local $4)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 4)
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 4)
     )
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $5
       (i32.add
        (get_local $5)
        (i32.const 2)
       )
      )
      (get_local $2)
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.add
     (get_local $0)
     (i32.const 2)
    )
   )
   (set_local $4
    (i32.add
     (get_local $1)
     (i32.const 2)
    )
   )
   (set_local $5
    (i32.const 1)
   )
   (loop $label$2
    (i32.store16
     (get_local $3)
     (i32.load16_u
      (get_local $4)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 4)
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 4)
     )
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $5
       (i32.add
        (get_local $5)
        (i32.const 2)
       )
      )
      (get_local $2)
     )
    )
   )
  )
 )
 (func $_Z10copyBufferPjS_l (; 8 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (set_local $3
    (get_local $0)
   )
   (set_local $4
    (get_local $1)
   )
   (loop $label$1
    (i32.store
     (get_local $3)
     (i32.load
      (get_local $4)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 8)
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 8)
     )
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $5
       (i32.add
        (get_local $5)
        (i32.const 2)
       )
      )
      (get_local $2)
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.add
     (get_local $0)
     (i32.const 4)
    )
   )
   (set_local $4
    (i32.add
     (get_local $1)
     (i32.const 4)
    )
   )
   (set_local $5
    (i32.const 1)
   )
   (loop $label$2
    (i32.store
     (get_local $3)
     (i32.load
      (get_local $4)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 8)
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 8)
     )
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $5
       (i32.add
        (get_local $5)
        (i32.const 2)
       )
      )
      (get_local $2)
     )
    )
   )
  )
 )
 (func $_Z9setBufferPhlh (; 9 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 1)
    )
   )
   (set_local $3
    (i32.const 0)
   )
   (loop $label$1
    (i32.store8
     (i32.add
      (get_local $0)
      (get_local $3)
     )
     (get_local $2)
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $3
       (i32.add
        (get_local $3)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.const 1)
   )
   (loop $label$2
    (i32.store8
     (i32.add
      (get_local $0)
      (get_local $3)
     )
     (get_local $2)
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $3
       (i32.add
        (get_local $3)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
   )
  )
 )
 (func $_Z9setBufferPtlt (; 10 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 1)
    )
   )
   (set_local $4
    (i32.const 0)
   )
   (set_local $3
    (get_local $0)
   )
   (loop $label$1
    (i32.store16
     (get_local $3)
     (get_local $2)
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 4)
     )
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $4
       (i32.add
        (get_local $4)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.add
     (get_local $0)
     (i32.const 2)
    )
   )
   (set_local $4
    (i32.const 1)
   )
   (loop $label$2
    (i32.store16
     (get_local $3)
     (get_local $2)
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 4)
     )
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $4
       (i32.add
        (get_local $4)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
   )
  )
 )
 (func $_Z9setBufferPjlj (; 11 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 1)
    )
   )
   (set_local $4
    (i32.const 0)
   )
   (set_local $3
    (get_local $0)
   )
   (loop $label$1
    (i32.store
     (get_local $3)
     (get_local $2)
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 8)
     )
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $4
       (i32.add
        (get_local $4)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.add
     (get_local $0)
     (i32.const 4)
    )
   )
   (set_local $4
    (i32.const 1)
   )
   (loop $label$2
    (i32.store
     (get_local $3)
     (get_local $2)
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 8)
     )
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $4
       (i32.add
        (get_local $4)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
   )
  )
 )
 (func $_Z16createEmptyListsv (; 12 ;)
  (local $0 i32)
  (set_local $0
   (i32.const -2)
  )
  (loop $label$0
   (i32.store8
    (i32.add
     (get_local $0)
     (i32.const 65602)
    )
    (i32.const 225)
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $0
      (i32.add
       (get_local $0)
       (i32.const 2)
      )
     )
     (i32.const 4986)
    )
   )
  )
  (set_local $0
   (i32.const -1)
  )
  (loop $label$1
   (i32.store8
    (i32.add
     (get_local $0)
     (i32.const 65602)
    )
    (i32.const 225)
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $0
      (i32.add
       (get_local $0)
       (i32.const 2)
      )
     )
     (i32.const 4986)
    )
   )
  )
 )
 (func $_Z14createIdxListsv (; 13 ;)
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
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (set_local $7
   (i32.const 0)
  )
  (set_local $8
   (i32.const 65628)
  )
  (set_local $14
   (i32.lt_u
    (tee_local $0
     (i32.load8_u offset=16
      (i32.const 0)
     )
    )
    (i32.const 3)
   )
  )
  (set_local $10
   (i32.lt_u
    (get_local $0)
    (i32.const 4)
   )
  )
  (set_local $12
   (i32.lt_u
    (get_local $0)
    (i32.const 5)
   )
  )
  (set_local $11
   (i32.lt_u
    (get_local $0)
    (i32.const 6)
   )
  )
  (set_local $13
   (i32.lt_u
    (get_local $0)
    (i32.const 7)
   )
  )
  (set_local $1
   (i32.lt_u
    (get_local $0)
    (i32.const 8)
   )
  )
  (set_local $2
   (i32.lt_u
    (get_local $0)
    (i32.const 9)
   )
  )
  (set_local $3
   (i32.lt_u
    (get_local $0)
    (i32.const 10)
   )
  )
  (set_local $4
   (i32.lt_u
    (get_local $0)
    (i32.const 11)
   )
  )
  (set_local $5
   (i32.lt_u
    (get_local $0)
    (i32.const 12)
   )
  )
  (set_local $6
   (i32.lt_u
    (get_local $0)
    (i32.const 13)
   )
  )
  (set_local $9
   (i32.const 14)
  )
  (loop $label$0
   (block $label$1
    (br_if $label$1
     (i32.ge_u
      (get_local $7)
      (get_local $0)
     )
    )
    (br_if $label$1
     (i32.eqz
      (get_local $0)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -14)
     )
     (i32.add
      (get_local $9)
      (i32.const -14)
     )
    )
    (br_if $label$1
     (i32.le_u
      (get_local $0)
      (i32.const 1)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -13)
     )
     (i32.add
      (get_local $9)
      (i32.const -13)
     )
    )
    (br_if $label$1
     (get_local $14)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -12)
     )
     (i32.add
      (get_local $9)
      (i32.const -12)
     )
    )
    (br_if $label$1
     (get_local $10)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -11)
     )
     (i32.add
      (get_local $9)
      (i32.const -11)
     )
    )
    (br_if $label$1
     (get_local $12)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -10)
     )
     (i32.add
      (get_local $9)
      (i32.const -10)
     )
    )
    (br_if $label$1
     (get_local $11)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -9)
     )
     (i32.add
      (get_local $9)
      (i32.const -9)
     )
    )
    (br_if $label$1
     (get_local $13)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -8)
     )
     (i32.add
      (get_local $9)
      (i32.const -8)
     )
    )
    (br_if $label$1
     (get_local $1)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -7)
     )
     (i32.add
      (get_local $9)
      (i32.const -7)
     )
    )
    (br_if $label$1
     (get_local $2)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -6)
     )
     (i32.add
      (get_local $9)
      (i32.const -6)
     )
    )
    (br_if $label$1
     (get_local $3)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -5)
     )
     (i32.add
      (get_local $9)
      (i32.const -5)
     )
    )
    (br_if $label$1
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -4)
     )
     (i32.add
      (get_local $9)
      (i32.const -4)
     )
    )
    (br_if $label$1
     (get_local $5)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -3)
     )
     (i32.add
      (get_local $9)
      (i32.const -3)
     )
    )
    (br_if $label$1
     (get_local $6)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -2)
     )
     (i32.add
      (get_local $9)
      (i32.const -2)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (get_local $0)
      (i32.const 14)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -1)
     )
     (i32.add
      (get_local $9)
      (i32.const -1)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (get_local $0)
      (i32.const 15)
     )
    )
    (i32.store8
     (get_local $8)
     (get_local $9)
    )
   )
   (set_local $8
    (i32.add
     (get_local $8)
     (i32.const 43)
    )
   )
   (set_local $7
    (i32.add
     (get_local $7)
     (i32.const 1)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $9
      (i32.add
       (get_local $9)
       (i32.const 15)
      )
     )
     (i32.const 239)
    )
   )
  )
  (set_local $7
   (i32.const 0)
  )
  (set_local $8
   (i32.const 66875)
  )
  (set_local $9
   (i32.lt_u
    (get_local $0)
    (i32.const 3)
   )
  )
  (set_local $14
   (i32.lt_u
    (get_local $0)
    (i32.const 4)
   )
  )
  (set_local $10
   (i32.lt_u
    (get_local $0)
    (i32.const 5)
   )
  )
  (set_local $12
   (i32.lt_u
    (get_local $0)
    (i32.const 6)
   )
  )
  (set_local $11
   (i32.lt_u
    (get_local $0)
    (i32.const 7)
   )
  )
  (set_local $13
   (i32.lt_u
    (get_local $0)
    (i32.const 8)
   )
  )
  (set_local $1
   (i32.lt_u
    (get_local $0)
    (i32.const 9)
   )
  )
  (set_local $2
   (i32.lt_u
    (get_local $0)
    (i32.const 10)
   )
  )
  (set_local $3
   (i32.lt_u
    (get_local $0)
    (i32.const 11)
   )
  )
  (set_local $4
   (i32.lt_u
    (get_local $0)
    (i32.const 12)
   )
  )
  (set_local $5
   (i32.lt_u
    (get_local $0)
    (i32.const 13)
   )
  )
  (set_local $6
   (i32.lt_u
    (get_local $0)
    (i32.const 14)
   )
  )
  (loop $label$2
   (block $label$3
    (br_if $label$3
     (i32.ge_u
      (get_local $7)
      (get_local $0)
     )
    )
    (br_if $label$3
     (i32.eqz
      (get_local $0)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -14)
     )
     (get_local $7)
    )
    (br_if $label$3
     (i32.le_u
      (get_local $0)
      (i32.const 1)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -13)
     )
     (i32.add
      (get_local $7)
      (i32.const 15)
     )
    )
    (br_if $label$3
     (get_local $9)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -12)
     )
     (i32.add
      (get_local $7)
      (i32.const 30)
     )
    )
    (br_if $label$3
     (get_local $14)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -11)
     )
     (i32.add
      (get_local $7)
      (i32.const 45)
     )
    )
    (br_if $label$3
     (get_local $10)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -10)
     )
     (i32.add
      (get_local $7)
      (i32.const 60)
     )
    )
    (br_if $label$3
     (get_local $12)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -9)
     )
     (i32.add
      (get_local $7)
      (i32.const 75)
     )
    )
    (br_if $label$3
     (get_local $11)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -8)
     )
     (i32.add
      (get_local $7)
      (i32.const 90)
     )
    )
    (br_if $label$3
     (get_local $13)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -7)
     )
     (i32.add
      (get_local $7)
      (i32.const 105)
     )
    )
    (br_if $label$3
     (get_local $1)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -6)
     )
     (i32.add
      (get_local $7)
      (i32.const 120)
     )
    )
    (br_if $label$3
     (get_local $2)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -5)
     )
     (i32.add
      (get_local $7)
      (i32.const 135)
     )
    )
    (br_if $label$3
     (get_local $3)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -4)
     )
     (i32.add
      (get_local $7)
      (i32.const 150)
     )
    )
    (br_if $label$3
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -3)
     )
     (i32.add
      (get_local $7)
      (i32.const 165)
     )
    )
    (br_if $label$3
     (get_local $5)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -2)
     )
     (i32.add
      (get_local $7)
      (i32.const 180)
     )
    )
    (br_if $label$3
     (get_local $6)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -1)
     )
     (i32.add
      (get_local $7)
      (i32.const 195)
     )
    )
    (br_if $label$3
     (i32.lt_u
      (get_local $0)
      (i32.const 15)
     )
    )
    (i32.store8
     (get_local $8)
     (i32.add
      (get_local $7)
      (i32.const 210)
     )
    )
   )
   (set_local $8
    (i32.add
     (get_local $8)
     (i32.const 43)
    )
   )
   (br_if $label$2
    (i32.ne
     (tee_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $11
   (i32.const 0)
  )
  (set_local $12
   (i32.const 210)
  )
  (set_local $10
   (i32.const 68108)
  )
  (set_local $14
   (i32.const 14)
  )
  (set_local $9
   (i32.const 1)
  )
  (loop $label$4
   (set_local $8
    (get_local $12)
   )
   (set_local $7
    (i32.const 0)
   )
   (loop $label$5
    (block $label$6
     (br_if $label$6
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$6
      (i32.ge_u
       (i32.add
        (get_local $14)
        (get_local $7)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $10)
       (get_local $7)
      )
      (get_local $8)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 16)
     )
    )
    (br_if $label$5
     (i32.ne
      (get_local $9)
      (tee_local $7
       (i32.add
        (get_local $7)
        (i32.const 1)
       )
      )
     )
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const -1)
    )
   )
   (set_local $10
    (i32.add
     (get_local $10)
     (i32.const 43)
    )
   )
   (set_local $12
    (i32.add
     (get_local $12)
     (i32.const -15)
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (br_if $label$4
    (i32.ne
     (tee_local $11
      (i32.add
       (get_local $11)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $14
   (i32.const 69312)
  )
  (set_local $10
   (i32.const 0)
  )
  (loop $label$7
   (set_local $8
    (i32.const 14)
   )
   (set_local $7
    (i32.const 0)
   )
   (loop $label$8
    (block $label$9
     (br_if $label$9
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$9
      (i32.ge_u
       (i32.add
        (i32.add
         (get_local $9)
         (get_local $7)
        )
        (i32.const 14)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $14)
       (get_local $7)
      )
      (i32.add
       (get_local $9)
       (get_local $8)
      )
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 16)
     )
    )
    (br_if $label$8
     (i32.ne
      (i32.add
       (get_local $9)
       (tee_local $7
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
      )
      (i32.const 1)
     )
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const -43)
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const -1)
    )
   )
   (br_if $label$7
    (i32.ne
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.const 14)
    )
   )
  )
  (set_local $10
   (i32.const 0)
  )
  (set_local $14
   (i32.const 69355)
  )
  (loop $label$10
   (set_local $8
    (get_local $10)
   )
   (set_local $9
    (get_local $10)
   )
   (set_local $7
    (i32.const 0)
   )
   (loop $label$11
    (block $label$12
     (br_if $label$12
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$12
      (i32.ge_u
       (i32.and
        (get_local $8)
        (i32.const 255)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $14)
       (get_local $7)
      )
      (get_local $9)
     )
    )
    (set_local $9
     (i32.add
      (get_local $9)
      (i32.const 14)
     )
    )
    (set_local $7
     (i32.add
      (get_local $7)
      (i32.const 1)
     )
    )
    (br_if $label$11
     (i32.ne
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const -1)
       )
      )
      (i32.const -1)
     )
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const 43)
    )
   )
   (br_if $label$10
    (i32.ne
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $13
   (i32.const 0)
  )
  (set_local $12
   (i32.const 70559)
  )
  (set_local $11
   (i32.const 224)
  )
  (set_local $10
   (i32.const 14)
  )
  (set_local $14
   (i32.const 1)
  )
  (loop $label$13
   (set_local $9
    (get_local $11)
   )
   (set_local $7
    (i32.const 14)
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$14
    (block $label$15
     (br_if $label$15
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$15
      (i32.ge_u
       (i32.add
        (get_local $10)
        (get_local $8)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $12)
       (get_local $8)
      )
      (get_local $9)
     )
    )
    (set_local $9
     (i32.add
      (get_local $9)
      (i32.const 14)
     )
    )
    (set_local $7
     (i32.add
      (get_local $7)
      (i32.const -1)
     )
    )
    (br_if $label$14
     (i32.ne
      (get_local $14)
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
    )
   )
   (set_local $10
    (i32.add
     (get_local $10)
     (i32.const -1)
    )
   )
   (set_local $11
    (i32.add
     (get_local $11)
     (i32.const -15)
    )
   )
   (set_local $12
    (i32.add
     (get_local $12)
     (i32.const -43)
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const 1)
    )
   )
   (br_if $label$13
    (i32.ne
     (tee_local $13
      (i32.add
       (get_local $13)
       (i32.const 1)
      )
     )
     (i32.const 14)
    )
   )
  )
 )
 (func $_Z14createIdxTablev (; 14 ;)
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
  (local $11 i32)
  (local $12 i32)
  (set_local $9
   (i32.const 0)
  )
  (set_local $0
   (i32.load8_u offset=16
    (i32.const 0)
   )
  )
  (set_local $8
   (i32.const 70593)
  )
  (set_local $10
   (i32.const 0)
  )
  (loop $label$0
   (set_local $1
    (i32.div_u
     (tee_local $11
      (i32.and
       (get_local $10)
       (i32.const 255)
      )
     )
     (i32.const 15)
    )
   )
   (set_local $12
    (i32.div_u
     (i32.and
      (get_local $9)
      (i32.const 255)
     )
     (i32.const 15)
    )
   )
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.ge_u
       (tee_local $11
        (i32.rem_u
         (get_local $11)
         (i32.const 15)
        )
       )
       (tee_local $6
        (i32.and
         (get_local $0)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $2
      (i32.add
       (i32.add
        (tee_local $4
         (i32.mul
          (get_local $12)
          (i32.const 43)
         )
        )
        (get_local $11)
       )
       (i32.const 65600)
      )
     )
     (set_local $3
      (i32.add
       (i32.add
        (tee_local $7
         (i32.mul
          (get_local $11)
          (i32.const 43)
         )
        )
        (get_local $12)
       )
       (i32.const 66847)
      )
     )
     (set_local $5
      (i32.add
       (i32.add
        (i32.add
         (select
          (tee_local $12
           (i32.add
            (get_local $1)
            (i32.const 14)
           )
          )
          (i32.sub
           (i32.const 28)
           (get_local $11)
          )
          (i32.lt_u
           (i32.add
            (get_local $1)
            (get_local $11)
           )
           (i32.const 15)
          )
         )
         (get_local $7)
        )
        (get_local $4)
       )
       (i32.const 69327)
      )
     )
     (set_local $4
      (i32.add
       (i32.sub
        (i32.add
         (select
          (tee_local $11
           (i32.add
            (get_local $11)
            (i32.const 14)
           )
          )
          (get_local $12)
          (i32.lt_s
           (i32.sub
            (get_local $11)
            (get_local $1)
           )
           (i32.const 15)
          )
         )
         (get_local $7)
        )
        (get_local $4)
       )
       (i32.const 68682)
      )
     )
     (set_local $12
      (i32.const 0)
     )
     (set_local $11
      (get_local $8)
     )
     (loop $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.ge_u
          (i32.and
           (get_local $1)
           (i32.const 255)
          )
          (get_local $6)
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const -1)
         )
         (i32.load8_u
          (i32.add
           (get_local $2)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (get_local $11)
         (i32.load8_u
          (i32.add
           (get_local $3)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const 1)
         )
         (i32.load8_u
          (i32.add
           (get_local $4)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const 2)
         )
         (i32.load8_u
          (i32.add
           (get_local $5)
           (get_local $12)
          )
         )
        )
        (br $label$4)
       )
       (i32.store
        (i32.add
         (get_local $11)
         (i32.const -1)
        )
        (i32.const -505290271)
       )
      )
      (set_local $11
       (i32.add
        (get_local $11)
        (i32.const 4)
       )
      )
      (br_if $label$3
       (i32.ne
        (tee_local $12
         (i32.add
          (get_local $12)
          (i32.const 1)
         )
        )
        (i32.const 29)
       )
      )
      (br $label$1)
     )
    )
    (drop
     (call $memset
      (i32.add
       (i32.mul
        (get_local $10)
        (i32.const 116)
       )
       (i32.const 70592)
      )
      (i32.const 225)
      (i32.const 116)
     )
    )
   )
   (set_local $8
    (i32.add
     (get_local $8)
     (i32.const 116)
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.const 225)
    )
   )
  )
  (drop
   (call $memset
    (i32.const 96692)
    (i32.const 225)
    (i32.const 116)
   )
  )
 )
 (func $_Z7moveIdxhch (; 15 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.add
     (get_local $2)
     (i32.shl
      (i32.add
       (i32.mul
        (get_local $0)
        (i32.const 29)
       )
       (get_local $1)
      )
      (i32.const 2)
     )
    )
    (i32.const 70648)
   )
  )
 )
 (func $_Z11getArrValuehchPc (; 16 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (i32.load8_s
   (i32.add
    (get_local $3)
    (i32.load8_u
     (i32.add
      (i32.add
       (get_local $2)
       (i32.shl
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 29)
         )
         (get_local $1)
        )
        (i32.const 2)
       )
      )
      (i32.const 70648)
     )
    )
   )
  )
 )
 (func $_Z20createAroundIdxTablev (; 17 ;)
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
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (set_local $0
   (i32.load8_u offset=16
    (i32.const 0)
   )
  )
  (set_local $10
   (i32.const 96831)
  )
  (set_local $9
   (i32.const 96832)
  )
  (set_local $11
   (i32.const 0)
  )
  (loop $label$0
   (i64.store align=1
    (i32.add
     (tee_local $1
      (i32.mul
       (get_local $11)
       (i32.const 240)
      )
     )
     (i32.const 96821)
    )
    (i64.const 0)
   )
   (i32.store16 align=1
    (i32.add
     (get_local $1)
     (i32.const 96829)
    )
    (i32.const 0)
   )
   (i32.store align=1
    (i32.add
     (get_local $1)
     (i32.const 96817)
    )
    (i32.const 0)
   )
   (i32.store8
    (tee_local $4
     (i32.add
      (get_local $1)
      (i32.const 96816)
     )
    )
    (i32.const 0)
   )
   (set_local $2
    (i32.or
     (get_local $1)
     (i32.const 15)
    )
   )
   (set_local $15
    (i32.const -2)
   )
   (loop $label$1
    (i32.store8
     (i32.add
      (i32.add
       (get_local $10)
       (get_local $15)
      )
      (i32.const 2)
     )
     (i32.const 225)
    )
    (br_if $label$1
     (i32.lt_s
      (tee_local $15
       (i32.add
        (get_local $15)
        (i32.const 2)
       )
      )
      (i32.const 223)
     )
    )
   )
   (set_local $15
    (i32.const -1)
   )
   (loop $label$2
    (i32.store8
     (i32.add
      (i32.add
       (get_local $9)
       (get_local $15)
      )
      (i32.const 1)
     )
     (i32.const 225)
    )
    (br_if $label$2
     (i32.lt_s
      (tee_local $15
       (i32.add
        (get_local $15)
        (i32.const 2)
       )
      )
      (i32.const 223)
     )
    )
   )
   (set_local $12
    (i32.div_u
     (tee_local $15
      (i32.and
       (get_local $11)
       (i32.const 255)
      )
     )
     (i32.const 15)
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ge_u
      (i32.rem_u
       (get_local $15)
       (i32.const 15)
      )
      (tee_local $15
       (i32.and
        (get_local $0)
        (i32.const 255)
       )
      )
     )
    )
    (br_if $label$3
     (i32.ge_u
      (i32.and
       (get_local $12)
       (i32.const 255)
      )
      (get_local $15)
     )
    )
    (set_local $12
     (i32.const 1)
    )
    (i32.store8
     (get_local $4)
     (i32.const 1)
    )
    (i32.store8
     (i32.add
      (get_local $2)
      (i32.const 96816)
     )
     (get_local $11)
    )
    (set_local $3
     (i32.mul
      (get_local $11)
      (i32.const 29)
     )
    )
    (set_local $15
     (i32.const 1)
    )
    (loop $label$4
     (set_local $6
      (i32.load8_u
       (i32.add
        (tee_local $4
         (i32.shl
          (i32.add
           (get_local $3)
           (get_local $12)
          )
          (i32.const 2)
         )
        )
        (i32.const 70649)
       )
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 70648)
       )
      )
     )
     (set_local $7
      (i32.load8_u
       (i32.add
        (tee_local $14
         (i32.shl
          (i32.add
           (i32.shr_s
            (i32.shl
             (tee_local $4
              (i32.sub
               (i32.const 0)
               (get_local $12)
              )
             )
             (i32.const 24)
            )
            (i32.const 24)
           )
           (get_local $3)
          )
          (i32.const 2)
         )
        )
        (i32.const 70648)
       )
      )
     )
     (block $label$5
      (br_if $label$5
       (i32.eq
        (tee_local $14
         (i32.load8_u
          (i32.add
           (get_local $14)
           (i32.const 70649)
          )
         )
        )
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $14)
        (i32.const 29)
       )
      )
      (set_local $13
       (i32.shr_s
        (i32.shl
         (tee_local $14
          (i32.sub
           (i32.const 1)
           (get_local $12)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$6
       (block $label$7
        (br_if $label$7
         (i32.eq
          (tee_local $13
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $13)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 70648)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $15)
            (i32.const 255)
           )
          )
          (i32.const 96816)
         )
         (get_local $13)
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
       )
       (br_if $label$6
        (i32.ge_s
         (get_local $12)
         (tee_local $13
          (i32.shr_s
           (i32.shl
            (tee_local $14
             (i32.add
              (get_local $14)
              (i32.const 1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
       )
      )
     )
     (block $label$8
      (br_if $label$8
       (i32.eq
        (get_local $5)
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $5)
        (i32.const 29)
       )
      )
      (set_local $13
       (i32.shr_s
        (i32.shl
         (tee_local $14
          (i32.sub
           (i32.const 1)
           (get_local $12)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$9
       (block $label$10
        (br_if $label$10
         (i32.eq
          (tee_local $13
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $13)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 70649)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $15)
            (i32.const 255)
           )
          )
          (i32.const 96816)
         )
         (get_local $13)
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
       )
       (br_if $label$9
        (i32.ge_s
         (get_local $12)
         (tee_local $13
          (i32.shr_s
           (i32.shl
            (tee_local $14
             (i32.add
              (get_local $14)
              (i32.const 1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
       )
      )
     )
     (block $label$11
      (br_if $label$11
       (i32.eq
        (get_local $6)
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $6)
        (i32.const 29)
       )
      )
      (set_local $13
       (i32.shr_s
        (i32.shl
         (tee_local $14
          (i32.add
           (get_local $12)
           (i32.const 255)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$12
       (block $label$13
        (br_if $label$13
         (i32.eq
          (tee_local $13
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $13)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 70648)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $15)
            (i32.const 255)
           )
          )
          (i32.const 96816)
         )
         (get_local $13)
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
       )
       (br_if $label$12
        (i32.ge_s
         (tee_local $13
          (i32.shr_s
           (i32.shl
            (tee_local $14
             (i32.add
              (get_local $14)
              (i32.const -1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
         (get_local $4)
        )
       )
      )
     )
     (block $label$14
      (br_if $label$14
       (i32.eq
        (get_local $7)
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $7)
        (i32.const 29)
       )
      )
      (set_local $13
       (i32.shr_s
        (i32.shl
         (tee_local $14
          (i32.add
           (get_local $12)
           (i32.const 255)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$15
       (block $label$16
        (br_if $label$16
         (i32.eq
          (tee_local $13
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $13)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 70649)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $15)
            (i32.const 255)
           )
          )
          (i32.const 96816)
         )
         (get_local $13)
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
       )
       (br_if $label$15
        (i32.ge_s
         (tee_local $13
          (i32.shr_s
           (i32.shl
            (tee_local $14
             (i32.add
              (get_local $14)
              (i32.const -1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
         (get_local $4)
        )
       )
      )
     )
     (i32.store8
      (i32.add
       (i32.add
        (get_local $12)
        (get_local $1)
       )
       (i32.const 96816)
      )
      (get_local $15)
     )
     (br_if $label$4
      (i32.ne
       (tee_local $12
        (i32.add
         (get_local $12)
         (i32.const 1)
        )
       )
       (i32.const 15)
      )
     )
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const 240)
    )
   )
   (set_local $10
    (i32.add
     (get_local $10)
     (i32.const 240)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $11
      (i32.add
       (get_local $11)
       (i32.const 1)
      )
     )
     (i32.const 225)
    )
   )
  )
 )
 (func $_Z9aroundIdxhh (; 18 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.add
     (i32.or
      (i32.mul
       (get_local $0)
       (i32.const 240)
      )
      (i32.const 15)
     )
     (get_local $1)
    )
    (i32.const 96816)
   )
  )
 )
 (func $_Z17getAroundIdxCounthh (; 19 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.add
     (i32.mul
      (get_local $0)
      (i32.const 240)
     )
     (get_local $1)
    )
    (i32.const 96816)
   )
  )
 )
 (func $_Z11isChildMovePhhS_h (; 20 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $6
   (i32.const 1)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (get_local $1)
     (i32.const 2)
    )
   )
   (br_if $label$0
    (i32.lt_u
     (get_local $3)
     (i32.const 2)
    )
   )
   (set_local $6
    (i32.const 1)
   )
   (loop $label$1
    (set_local $4
     (i32.load8_u
      (i32.add
       (get_local $0)
       (get_local $6)
      )
     )
    )
    (set_local $5
     (i32.const 1)
    )
    (block $label$2
     (loop $label$3
      (br_if $label$2
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $2)
          (get_local $5)
         )
        )
        (i32.and
         (get_local $4)
         (i32.const 255)
        )
       )
      )
      (br_if $label$3
       (i32.lt_u
        (tee_local $5
         (i32.and
          (i32.add
           (get_local $5)
           (i32.const 2)
          )
          (i32.const 65535)
         )
        )
        (get_local $3)
       )
      )
      (br $label$0)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $6
       (i32.and
        (i32.add
         (get_local $6)
         (i32.const 2)
        )
        (i32.const 65535)
       )
      )
      (get_local $1)
     )
    )
   )
  )
  (i32.ge_u
   (get_local $6)
   (get_local $1)
  )
 )
 (func $_Z12isRepeatMovePhS_h (; 21 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $5
   (i32.const 1)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (get_local $2)
     (i32.const 2)
    )
   )
   (set_local $5
    (i32.const 1)
   )
   (loop $label$1
    (set_local $3
     (i32.load8_u
      (i32.add
       (get_local $0)
       (get_local $5)
      )
     )
    )
    (set_local $4
     (i32.const 1)
    )
    (block $label$2
     (loop $label$3
      (br_if $label$2
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $4)
         )
        )
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
       )
      )
      (br_if $label$3
       (i32.lt_u
        (tee_local $4
         (i32.and
          (i32.add
           (get_local $4)
           (i32.const 2)
          )
          (i32.const 65535)
         )
        )
        (get_local $2)
       )
      )
      (br $label$0)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $5
       (i32.and
        (i32.add
         (get_local $5)
         (i32.const 2)
        )
        (i32.const 65535)
       )
      )
      (get_local $2)
     )
    )
   )
  )
  (i32.ge_u
   (get_local $5)
   (get_local $2)
  )
 )
 (func $_Z4inithh (; 22 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.store8 offset=16
   (i32.const 0)
   (get_local $0)
  )
  (i32.store8 offset=32
   (i32.const 0)
   (get_local $1)
  )
  (set_local $1
   (i32.const -2)
  )
  (loop $label$0
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.const 65602)
    )
    (i32.const 225)
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $1
      (i32.add
       (get_local $1)
       (i32.const 2)
      )
     )
     (i32.const 4986)
    )
   )
  )
  (set_local $1
   (i32.const -1)
  )
  (loop $label$1
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.const 65602)
    )
    (i32.const 225)
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $1
      (i32.add
       (get_local $1)
       (i32.const 2)
      )
     )
     (i32.const 4986)
    )
   )
  )
  (call $_Z14createIdxListsv)
  (call $_Z14createIdxTablev)
  (call $_Z20createAroundIdxTablev)
  (i32.const 1)
 )
 (func $_Z8testLinehhcPc (; 23 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (local $17 i32)
  (i32.store8 offset=150816
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $0
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 70628)
      )
     )
    )
   )
  )
  (i32.store8 offset=150817
   (i32.const 0)
   (tee_local $9
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 70632)
       )
      )
     )
    )
   )
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.ne
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $0)
      (i32.const 70636)
     )
    )
    (set_local $0
     (i32.const -9)
    )
    (set_local $13
     (i32.const 255)
    )
    (set_local $16
     (i32.const 0)
    )
    (set_local $17
     (i32.const 0)
    )
    (set_local $12
     (i32.const 0)
    )
    (set_local $11
     (i32.const 0)
    )
    (set_local $10
     (i32.const 0)
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $14
     (i32.const 0)
    )
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.const 150827)
      )
      (tee_local $7
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (get_local $8)
         )
        )
       )
      )
     )
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.eqz
         (tee_local $9
          (i32.and
           (get_local $9)
           (i32.const 255)
          )
         )
        )
       )
       (set_local $16
        (select
         (i32.add
          (get_local $16)
          (i32.const 1)
         )
         (i32.const 0)
         (tee_local $9
          (i32.eq
           (get_local $9)
           (i32.const 1)
          )
         )
        )
       )
       (set_local $17
        (select
         (get_local $17)
         (i32.const 0)
         (get_local $9)
        )
       )
       (br $label$3)
      )
      (set_local $17
       (i32.add
        (get_local $17)
        (i32.const 1)
       )
      )
     )
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (block $label$9
          (block $label$10
           (br_if $label$10
            (i32.ne
             (i32.add
              (tee_local $5
               (i32.and
                (get_local $16)
                (i32.const 255)
               )
              )
              (i32.and
               (get_local $17)
               (i32.const 255)
              )
             )
             (i32.const 5)
            )
           )
           (set_local $15
            (i32.add
             (get_local $0)
             (i32.const 5)
            )
           )
           (br_if $label$7
            (i32.ne
             (i32.load8_u offset=32
              (i32.const 0)
             )
             (i32.const 2)
            )
           )
           (br_if $label$9
            (i32.ne
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 150821)
              )
             )
             (i32.const 1)
            )
           )
           (set_local $9
            (get_local $7)
           )
           (br $label$8)
          )
          (set_local $9
           (get_local $7)
          )
          (br $label$5)
         )
         (set_local $9
          (i32.const 1)
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (get_local $7)
            (i32.const 255)
           )
           (i32.const 1)
          )
         )
        )
        (set_local $13
         (select
          (i32.const 28)
          (get_local $13)
          (tee_local $7
           (i32.and
            (i32.eq
             (get_local $5)
             (i32.const 5)
            )
            (i32.gt_s
             (get_local $5)
             (i32.shr_s
              (i32.shl
               (get_local $13)
               (i32.const 24)
              )
              (i32.const 24)
             )
            )
           )
          )
         )
        )
        (set_local $12
         (select
          (get_local $15)
          (get_local $12)
          (get_local $7)
         )
        )
        (set_local $11
         (select
          (i32.const 0)
          (get_local $11)
          (get_local $7)
         )
        )
        (set_local $10
         (select
          (i32.const 0)
          (get_local $10)
          (get_local $7)
         )
        )
        (br $label$6)
       )
       (set_local $12
        (select
         (get_local $15)
         (get_local $12)
         (tee_local $9
          (i32.gt_s
           (get_local $5)
           (i32.shr_s
            (i32.shl
             (get_local $13)
             (i32.const 24)
            )
            (i32.const 24)
           )
          )
         )
        )
       )
       (set_local $11
        (select
         (i32.const 0)
         (get_local $11)
         (get_local $9)
        )
       )
       (set_local $10
        (select
         (i32.const 0)
         (get_local $10)
         (get_local $9)
        )
       )
       (set_local $4
        (select
         (i32.const 1)
         (get_local $6)
         (get_local $9)
        )
       )
       (set_local $14
        (select
         (i32.const 0)
         (get_local $14)
         (get_local $9)
        )
       )
       (block $label$11
        (br_if $label$11
         (i32.ne
          (get_local $5)
          (i32.shr_s
           (i32.shl
            (tee_local $13
             (select
              (get_local $16)
              (get_local $13)
              (get_local $9)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
        (set_local $12
         (select
          (get_local $15)
          (get_local $12)
          (tee_local $9
           (i32.and
            (get_local $14)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $6
         (i32.const 0)
        )
        (set_local $10
         (i32.add
          (get_local $10)
          (i32.ne
           (get_local $9)
           (i32.const 0)
          )
         )
        )
        (set_local $11
         (i32.add
          (get_local $11)
          (i32.ne
           (i32.and
            (get_local $4)
            (i32.const 255)
           )
           (i32.const 0)
          )
         )
        )
        (set_local $14
         (i32.const 1)
        )
        (set_local $9
         (get_local $7)
        )
        (br $label$6)
       )
       (set_local $9
        (get_local $7)
       )
       (set_local $6
        (get_local $4)
       )
      )
      (block $label$12
       (br_if $label$12
        (i32.eqz
         (i32.load8_u
          (i32.add
           (get_local $0)
           (i32.const 150822)
          )
         )
        )
       )
       (set_local $16
        (i32.add
         (get_local $16)
         (i32.const -1)
        )
       )
       (set_local $14
        (i32.const 0)
       )
       (br $label$5)
      )
      (set_local $17
       (i32.add
        (get_local $17)
        (i32.const -1)
       )
      )
      (set_local $6
       (i32.const 1)
      )
     )
     (set_local $8
      (i32.add
       (get_local $8)
       (i32.const 4)
      )
     )
     (br_if $label$2
      (tee_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
     )
     (br $label$0)
    )
   )
   (set_local $8
    (i32.add
     (get_local $0)
     (i32.const 70636)
    )
   )
   (set_local $0
    (i32.const -9)
   )
   (set_local $13
    (i32.const 255)
   )
   (set_local $17
    (i32.const 0)
   )
   (set_local $16
    (i32.const 0)
   )
   (set_local $12
    (i32.const 0)
   )
   (set_local $11
    (i32.const 0)
   )
   (set_local $10
    (i32.const 0)
   )
   (set_local $15
    (i32.const 0)
   )
   (set_local $14
    (i32.const 0)
   )
   (loop $label$13
    (set_local $7
     (get_local $9)
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 150827)
     )
     (tee_local $9
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.load8_u
         (get_local $8)
        )
       )
      )
     )
    )
    (block $label$14
     (block $label$15
      (br_if $label$15
       (i32.eqz
        (tee_local $7
         (i32.and
          (get_local $7)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $17
       (select
        (i32.add
         (get_local $17)
         (i32.const 1)
        )
        (i32.const 0)
        (tee_local $7
         (i32.eq
          (get_local $7)
          (i32.and
           (get_local $2)
           (i32.const 255)
          )
         )
        )
       )
      )
      (set_local $16
       (select
        (get_local $16)
        (i32.const 0)
        (get_local $7)
       )
      )
      (br $label$14)
     )
     (set_local $16
      (i32.add
       (get_local $16)
       (i32.const 1)
      )
     )
    )
    (block $label$16
     (br_if $label$16
      (i32.ne
       (i32.add
        (tee_local $5
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (i32.and
         (get_local $16)
         (i32.const 255)
        )
       )
       (i32.const 5)
      )
     )
     (set_local $12
      (select
       (tee_local $4
        (i32.add
         (get_local $0)
         (i32.const 5)
        )
       )
       (get_local $12)
       (tee_local $7
        (i32.gt_s
         (get_local $5)
         (i32.shr_s
          (i32.shl
           (get_local $13)
           (i32.const 24)
          )
          (i32.const 24)
         )
        )
       )
      )
     )
     (set_local $11
      (select
       (i32.const 0)
       (get_local $11)
       (get_local $7)
      )
     )
     (set_local $10
      (select
       (i32.const 0)
       (get_local $10)
       (get_local $7)
      )
     )
     (set_local $6
      (select
       (i32.const 1)
       (get_local $15)
       (get_local $7)
      )
     )
     (set_local $14
      (select
       (i32.const 0)
       (get_local $14)
       (get_local $7)
      )
     )
     (block $label$17
      (block $label$18
       (br_if $label$18
        (i32.ne
         (get_local $5)
         (i32.shr_s
          (i32.shl
           (tee_local $13
            (select
             (get_local $17)
             (get_local $13)
             (get_local $7)
            )
           )
           (i32.const 24)
          )
          (i32.const 24)
         )
        )
       )
       (set_local $12
        (select
         (get_local $4)
         (get_local $12)
         (tee_local $7
          (i32.and
           (get_local $14)
           (i32.const 255)
          )
         )
        )
       )
       (set_local $15
        (i32.const 0)
       )
       (set_local $10
        (i32.add
         (get_local $10)
         (i32.ne
          (get_local $7)
          (i32.const 0)
         )
        )
       )
       (set_local $11
        (i32.add
         (get_local $11)
         (i32.ne
          (i32.and
           (get_local $6)
           (i32.const 255)
          )
          (i32.const 0)
         )
        )
       )
       (set_local $14
        (i32.const 1)
       )
       (br $label$17)
      )
      (set_local $15
       (get_local $6)
      )
     )
     (block $label$19
      (br_if $label$19
       (i32.eqz
        (i32.load8_u
         (i32.add
          (get_local $0)
          (i32.const 150822)
         )
        )
       )
      )
      (set_local $17
       (i32.add
        (get_local $17)
        (i32.const -1)
       )
      )
      (set_local $14
       (i32.const 0)
      )
      (br $label$16)
     )
     (set_local $16
      (i32.add
       (get_local $16)
       (i32.const -1)
      )
     )
     (set_local $15
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 4)
     )
    )
    (br_if $label$13
     (tee_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
    )
   )
  )
  (block $label$20
   (block $label$21
    (br_if $label$21
     (i32.eq
      (tee_local $9
       (i32.and
        (get_local $13)
        (i32.const 7)
       )
      )
      (i32.const 4)
     )
    )
    (set_local $0
     (i32.const 16)
    )
    (br_if $label$20
     (i32.eq
      (get_local $9)
      (i32.const 6)
     )
    )
    (set_local $0
     (i32.const 0)
    )
    (br $label$20)
   )
   (set_local $0
    (i32.const 0)
   )
   (br_if $label$20
    (i32.lt_u
     (i32.and
      (get_local $11)
      (i32.const 255)
     )
     (i32.const 2)
    )
   )
   (set_local $0
    (i32.shl
     (i32.eqz
      (i32.and
       (get_local $10)
       (i32.const 255)
      )
     )
     (i32.const 4)
    )
   )
  )
  (i32.and
   (i32.or
    (i32.or
     (i32.or
      (i32.or
       (i32.or
        (i32.shl
         (tee_local $9
          (i32.and
           (get_local $10)
           (i32.const 255)
          )
         )
         (i32.const 8)
        )
        (i32.shl
         (get_local $1)
         (i32.const 12)
        )
       )
       (i32.ne
        (get_local $9)
        (i32.const 0)
       )
      )
      (i32.shl
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
       (i32.const 5)
      )
     )
     (i32.and
      (i32.shl
       (get_local $13)
       (i32.const 1)
      )
      (i32.const 14)
     )
    )
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z12testLineFoulhhcPc (; 24 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (local $17 i32)
  (set_local $17
   (i32.const 0)
  )
  (i32.store8 offset=150816
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $0
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 70628)
      )
     )
    )
   )
  )
  (i32.store8 offset=150817
   (i32.const 0)
   (tee_local $14
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 70632)
       )
      )
     )
    )
   )
  )
  (set_local $12
   (i32.add
    (get_local $0)
    (i32.const 70636)
   )
  )
  (set_local $13
   (i32.const -5)
  )
  (set_local $16
   (i32.const 0)
  )
  (set_local $5
   (i32.const 0)
  )
  (set_local $6
   (i32.const 0)
  )
  (set_local $7
   (i32.const 0)
  )
  (set_local $8
   (i32.const 0)
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $15
   (i32.const 0)
  )
  (block $label$0
   (loop $label$1
    (i32.store8
     (i32.add
      (tee_local $4
       (get_local $13)
      )
      (i32.const 150823)
     )
     (tee_local $10
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.load8_u
         (get_local $12)
        )
       )
      )
     )
    )
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $13
         (i32.and
          (get_local $14)
          (i32.const 255)
         )
        )
        (i32.const 1)
       )
      )
      (set_local $0
       (i32.const 0)
      )
      (set_local $11
       (i32.const 0)
      )
      (br_if $label$2
       (get_local $13)
      )
      (set_local $0
       (i32.add
        (get_local $16)
        (i32.const 1)
       )
      )
      (set_local $11
       (get_local $17)
      )
      (br $label$2)
     )
     (set_local $11
      (i32.add
       (get_local $17)
       (i32.const 1)
      )
     )
     (set_local $0
      (get_local $16)
     )
    )
    (block $label$4
     (set_local $13
      (i32.add
       (get_local $4)
       (i32.const 1)
      )
     )
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (block $label$9
          (block $label$10
           (block $label$11
            (block $label$12
             (block $label$13
              (block $label$14
               (block $label$15
                (block $label$16
                 (br_if $label$16
                  (i32.ne
                   (i32.add
                    (tee_local $14
                     (i32.and
                      (get_local $11)
                      (i32.const 255)
                     )
                    )
                    (i32.and
                     (get_local $0)
                     (i32.const 255)
                    )
                   )
                   (i32.const 5)
                  )
                 )
                 (br_if $label$15
                  (i32.eq
                   (get_local $14)
                   (i32.const 3)
                  )
                 )
                 (br_if $label$14
                  (i32.eq
                   (get_local $14)
                   (i32.const 4)
                  )
                 )
                 (br_if $label$4
                  (i32.eq
                   (get_local $14)
                   (i32.const 5)
                  )
                 )
                 (set_local $16
                  (get_local $8)
                 )
                 (br $label$7)
                )
                (set_local $14
                 (get_local $10)
                )
                (set_local $16
                 (get_local $0)
                )
                (br $label$6)
               )
               (br_if $label$13
                (i32.gt_s
                 (tee_local $14
                  (i32.shr_s
                   (i32.shl
                    (get_local $15)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 3)
                )
               )
               (br_if $label$11
                (i32.ne
                 (i32.load8_u
                  (i32.add
                   (get_local $4)
                   (i32.const 150817)
                  )
                 )
                 (i32.const 1)
                )
               )
               (set_local $16
                (get_local $8)
               )
               (br $label$7)
              )
              (br_if $label$12
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $4)
                  (i32.const 150817)
                 )
                )
                (i32.const 1)
               )
              )
             )
             (set_local $16
              (get_local $8)
             )
             (br $label$7)
            )
            (br_if $label$10
             (i32.eq
              (i32.and
               (get_local $10)
               (i32.const 255)
              )
              (i32.const 1)
             )
            )
            (set_local $5
             (select
              (select
               (get_local $13)
               (get_local $5)
               (tee_local $14
                (i32.lt_s
                 (tee_local $17
                  (i32.shr_s
                   (i32.shl
                    (get_local $15)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 4)
                )
               )
              )
              (get_local $13)
              (i32.or
               (get_local $14)
               (i32.eqz
                (tee_local $9
                 (i32.and
                  (get_local $9)
                  (i32.const 255)
                 )
                )
               )
              )
             )
            )
            (set_local $16
             (i32.const 0)
            )
            (set_local $7
             (i32.add
              (select
               (i32.const 0)
               (get_local $7)
               (get_local $14)
              )
              (i32.and
               (i32.gt_s
                (get_local $17)
                (i32.const 3)
               )
               (i32.ne
                (get_local $9)
                (i32.const 0)
               )
              )
             )
            )
            (set_local $6
             (i32.add
              (select
               (i32.const 0)
               (get_local $6)
               (get_local $14)
              )
              (i32.or
               (get_local $14)
               (i32.ne
                (i32.and
                 (get_local $8)
                 (i32.const 255)
                )
                (i32.const 0)
               )
              )
             )
            )
            (set_local $15
             (select
              (i32.const 4)
              (get_local $15)
              (get_local $14)
             )
            )
            (br $label$8)
           )
           (br_if $label$9
            (i32.ne
             (i32.and
              (get_local $10)
              (i32.const 255)
             )
             (i32.const 1)
            )
           )
          )
          (set_local $10
           (i32.const 1)
          )
          (set_local $16
           (get_local $8)
          )
          (br $label$7)
         )
         (set_local $15
          (i32.const 3)
         )
         (set_local $5
          (select
           (select
            (get_local $13)
            (get_local $5)
            (tee_local $17
             (i32.lt_s
              (get_local $14)
              (i32.const 3)
             )
            )
           )
           (get_local $13)
           (i32.or
            (get_local $17)
            (i32.eqz
             (tee_local $9
              (i32.and
               (get_local $9)
               (i32.const 255)
              )
             )
            )
           )
          )
         )
         (set_local $16
          (i32.const 0)
         )
         (set_local $7
          (i32.add
           (select
            (i32.const 0)
            (get_local $7)
            (get_local $17)
           )
           (i32.and
            (i32.gt_s
             (get_local $14)
             (i32.const 2)
            )
            (i32.ne
             (get_local $9)
             (i32.const 0)
            )
           )
          )
         )
         (set_local $6
          (i32.add
           (select
            (i32.const 0)
            (get_local $6)
            (get_local $17)
           )
           (i32.or
            (get_local $17)
            (i32.ne
             (i32.and
              (get_local $8)
              (i32.const 255)
             )
             (i32.const 0)
            )
           )
          )
         )
        )
        (set_local $9
         (i32.const 1)
        )
       )
       (block $label$17
        (br_if $label$17
         (i32.eqz
          (i32.load8_u
           (i32.add
            (get_local $4)
            (i32.const 150818)
           )
          )
         )
        )
        (set_local $17
         (i32.add
          (get_local $11)
          (i32.const -1)
         )
        )
        (set_local $9
         (i32.const 0)
        )
        (set_local $14
         (get_local $10)
        )
        (set_local $8
         (get_local $16)
        )
        (set_local $16
         (get_local $0)
        )
        (br $label$5)
       )
       (set_local $16
        (i32.add
         (get_local $0)
         (i32.const -1)
        )
       )
       (set_local $8
        (i32.const 1)
       )
       (set_local $14
        (get_local $10)
       )
      )
      (set_local $17
       (get_local $11)
      )
     )
     (set_local $12
      (i32.add
       (get_local $12)
       (i32.const 4)
      )
     )
     (br_if $label$1
      (i32.lt_s
       (get_local $13)
       (i32.const 4)
      )
     )
     (br $label$0)
    )
   )
   (set_local $5
    (i32.add
     (get_local $4)
     (i32.const 1)
    )
   )
   (set_local $7
    (i32.const 0)
   )
   (set_local $15
    (i32.const 28)
   )
   (block $label$18
    (br_if $label$18
     (i32.eq
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 150817)
       )
      )
      (i32.const 1)
     )
    )
    (set_local $15
     (select
      (i32.const 28)
      (i32.const 5)
      (i32.eq
       (i32.and
        (get_local $10)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
    )
   )
   (set_local $6
    (i32.const 0)
   )
  )
  (set_local $11
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $7)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
     (i32.shl
      (get_local $1)
      (i32.const 12)
     )
    )
    (i32.shl
     (i32.and
      (get_local $5)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (block $label$19
   (block $label$20
    (br_if $label$20
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $0
     (select
      (i32.const 9)
      (i32.const 7)
      (i32.eq
       (i32.and
        (get_local $15)
        (i32.const 255)
       )
       (i32.const 4)
      )
     )
    )
    (br $label$19)
   )
   (set_local $0
    (select
     (select
      (i32.const 24)
      (tee_local $0
       (i32.shl
        (i32.shr_s
         (i32.shl
          (get_local $15)
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const 1)
       )
      )
      (i32.gt_u
       (i32.and
        (get_local $6)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
     (get_local $0)
     (i32.eq
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
      (i32.const 4)
     )
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $11)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z12testLineFourhhcPc (; 25 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (set_local $5
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $4
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (br_if $label$6
          (i32.eqz
           (tee_local $6
            (i32.and
             (i32.eq
              (get_local $2)
              (i32.const 1)
             )
             (i32.eq
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 2)
             )
            )
           )
          )
         )
         (set_local $9
          (i32.add
           (i32.add
            (i32.mul
             (get_local $0)
             (i32.const 116)
            )
            (get_local $1)
           )
           (i32.const 70632)
          )
         )
         (set_local $11
          (i32.const -4)
         )
         (set_local $15
          (i32.const -5)
         )
         (set_local $10
          (i32.const -67108864)
         )
         (set_local $13
          (i32.const 0)
         )
         (set_local $0
          (i32.const 0)
         )
         (set_local $19
          (i32.const 0)
         )
         (set_local $18
          (i32.const 0)
         )
         (set_local $17
          (i32.const 0)
         )
         (set_local $12
          (i32.const 0)
         )
         (set_local $14
          (i32.const 0)
         )
         (set_local $16
          (i32.const 0)
         )
         (loop $label$7
          (set_local $7
           (get_local $15)
          )
          (block $label$8
           (block $label$9
            (br_if $label$9
             (i32.eqz
              (tee_local $15
               (i32.load8_u
                (i32.add
                 (get_local $3)
                 (i32.load8_u
                  (get_local $9)
                 )
                )
               )
              )
             )
            )
            (set_local $13
             (select
              (i32.add
               (get_local $13)
               (i32.const 1)
              )
              (i32.const 0)
              (tee_local $15
               (i32.eq
                (get_local $15)
                (i32.const 1)
               )
              )
             )
            )
            (set_local $0
             (select
              (get_local $0)
              (i32.const 0)
              (get_local $15)
             )
            )
            (br $label$8)
           )
           (set_local $0
            (i32.add
             (get_local $0)
             (i32.const 1)
            )
           )
          )
          (set_local $15
           (i32.add
            (get_local $7)
            (i32.const 1)
           )
          )
          (block $label$10
           (br_if $label$10
            (i32.ne
             (i32.add
              (tee_local $8
               (i32.and
                (get_local $13)
                (i32.const 255)
               )
              )
              (i32.and
               (get_local $0)
               (i32.const 255)
              )
             )
             (i32.const 5)
            )
           )
           (block $label$11
            (block $label$12
             (br_if $label$12
              (i32.eq
               (get_local $8)
               (i32.const 4)
              )
             )
             (set_local $2
              (get_local $10)
             )
             (br_if $label$11
              (i32.ne
               (get_local $8)
               (i32.const 5)
              )
             )
             (br $label$5)
            )
            (set_local $2
             (i32.shl
              (get_local $11)
              (i32.const 24)
             )
            )
            (br_if $label$11
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.add
                       (get_local $10)
                       (i32.const -83886080)
                      )
                      (i32.const 24)
                     )
                     (get_local $4)
                    )
                    (i32.const 2)
                   )
                   (get_local $5)
                  )
                  (i32.const 70592)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$11
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.add
                       (get_local $10)
                       (i32.const 16777216)
                      )
                      (i32.const 24)
                     )
                     (get_local $4)
                    )
                    (i32.const 2)
                   )
                   (get_local $5)
                  )
                  (i32.const 70592)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (set_local $19
             (select
              (select
               (get_local $15)
               (get_local $19)
               (tee_local $7
                (i32.lt_s
                 (tee_local $8
                  (i32.shr_s
                   (i32.shl
                    (get_local $16)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 4)
                )
               )
              )
              (get_local $15)
              (i32.or
               (get_local $7)
               (i32.eqz
                (tee_local $14
                 (i32.and
                  (get_local $14)
                  (i32.const 255)
                 )
                )
               )
              )
             )
            )
            (set_local $17
             (i32.add
              (select
               (i32.const 0)
               (get_local $17)
               (get_local $7)
              )
              (i32.and
               (i32.gt_s
                (get_local $8)
                (i32.const 3)
               )
               (i32.ne
                (get_local $14)
                (i32.const 0)
               )
              )
             )
            )
            (set_local $18
             (i32.add
              (select
               (i32.const 0)
               (get_local $18)
               (get_local $7)
              )
              (i32.or
               (get_local $7)
               (i32.ne
                (i32.and
                 (get_local $12)
                 (i32.const 255)
                )
                (i32.const 0)
               )
              )
             )
            )
            (set_local $16
             (select
              (i32.const 4)
              (get_local $16)
              (get_local $7)
             )
            )
            (set_local $14
             (i32.const 1)
            )
            (set_local $12
             (i32.const 0)
            )
           )
           (block $label$13
            (br_if $label$13
             (i32.eqz
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.add
                       (get_local $2)
                       (i32.const -67108864)
                      )
                      (i32.const 24)
                     )
                     (get_local $4)
                    )
                    (i32.const 2)
                   )
                   (get_local $5)
                  )
                  (i32.const 70592)
                 )
                )
               )
              )
             )
            )
            (set_local $13
             (i32.add
              (get_local $13)
              (i32.const -1)
             )
            )
            (set_local $14
             (i32.const 0)
            )
            (br $label$10)
           )
           (set_local $0
            (i32.add
             (get_local $0)
             (i32.const -1)
            )
           )
           (set_local $12
            (i32.const 1)
           )
          )
          (set_local $9
           (i32.add
            (get_local $9)
            (i32.const 4)
           )
          )
          (set_local $10
           (i32.add
            (get_local $10)
            (i32.const 16777216)
           )
          )
          (set_local $11
           (i32.add
            (get_local $11)
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.lt_s
            (get_local $15)
            (i32.const 4)
           )
          )
          (br $label$0)
         )
        )
        (set_local $9
         (i32.add
          (i32.add
           (i32.mul
            (get_local $0)
            (i32.const 116)
           )
           (get_local $1)
          )
          (i32.const 70632)
         )
        )
        (set_local $0
         (i32.const -5)
        )
        (set_local $10
         (i32.const -134217728)
        )
        (set_local $13
         (i32.const 0)
        )
        (set_local $15
         (i32.const 0)
        )
        (set_local $19
         (i32.const 0)
        )
        (set_local $18
         (i32.const 0)
        )
        (set_local $17
         (i32.const 0)
        )
        (set_local $14
         (i32.const 0)
        )
        (set_local $8
         (i32.const 0)
        )
        (set_local $16
         (i32.const 0)
        )
        (loop $label$14
         (set_local $11
          (get_local $0)
         )
         (block $label$15
          (block $label$16
           (br_if $label$16
            (i32.eqz
             (tee_local $0
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (get_local $9)
                )
               )
              )
             )
            )
           )
           (set_local $13
            (select
             (i32.add
              (get_local $13)
              (i32.const 1)
             )
             (i32.const 0)
             (tee_local $0
              (i32.eq
               (get_local $0)
               (i32.and
                (get_local $2)
                (i32.const 255)
               )
              )
             )
            )
           )
           (set_local $15
            (select
             (get_local $15)
             (i32.const 0)
             (get_local $0)
            )
           )
           (br $label$15)
          )
          (set_local $15
           (i32.add
            (get_local $15)
            (i32.const 1)
           )
          )
         )
         (set_local $0
          (i32.add
           (get_local $11)
           (i32.const 1)
          )
         )
         (block $label$17
          (br_if $label$17
           (i32.ne
            (i32.add
             (tee_local $7
              (i32.and
               (get_local $13)
               (i32.const 255)
              )
             )
             (i32.and
              (get_local $15)
              (i32.const 255)
             )
            )
            (i32.const 5)
           )
          )
          (block $label$18
           (block $label$19
            (br_if $label$19
             (i32.eq
              (get_local $7)
              (i32.const 4)
             )
            )
            (br_if $label$18
             (i32.ne
              (get_local $7)
              (i32.const 5)
             )
            )
            (br $label$4)
           )
           (set_local $19
            (select
             (select
              (get_local $0)
              (get_local $19)
              (tee_local $11
               (i32.lt_s
                (tee_local $7
                 (i32.shr_s
                  (i32.shl
                   (get_local $16)
                   (i32.const 24)
                  )
                  (i32.const 24)
                 )
                )
                (i32.const 4)
               )
              )
             )
             (get_local $0)
             (i32.or
              (get_local $11)
              (i32.eqz
               (tee_local $8
                (i32.and
                 (get_local $8)
                 (i32.const 255)
                )
               )
              )
             )
            )
           )
           (set_local $17
            (i32.add
             (select
              (i32.const 0)
              (get_local $17)
              (get_local $11)
             )
             (i32.and
              (i32.gt_s
               (get_local $7)
               (i32.const 3)
              )
              (i32.ne
               (get_local $8)
               (i32.const 0)
              )
             )
            )
           )
           (set_local $18
            (i32.add
             (select
              (i32.const 0)
              (get_local $18)
              (get_local $11)
             )
             (i32.or
              (get_local $11)
              (i32.ne
               (i32.and
                (get_local $14)
                (i32.const 255)
               )
               (i32.const 0)
              )
             )
            )
           )
           (set_local $16
            (select
             (i32.const 4)
             (get_local $16)
             (get_local $11)
            )
           )
           (set_local $8
            (i32.const 1)
           )
           (set_local $14
            (i32.const 0)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $3)
               (i32.load8_u
                (i32.add
                 (i32.add
                  (i32.shl
                   (i32.add
                    (i32.shr_s
                     (get_local $10)
                     (i32.const 24)
                    )
                    (get_local $4)
                   )
                   (i32.const 2)
                  )
                  (get_local $5)
                 )
                 (i32.const 70592)
                )
               )
              )
             )
            )
           )
           (set_local $13
            (i32.add
             (get_local $13)
             (i32.const -1)
            )
           )
           (set_local $8
            (i32.const 0)
           )
           (br $label$17)
          )
          (set_local $15
           (i32.add
            (get_local $15)
            (i32.const -1)
           )
          )
          (set_local $14
           (i32.const 1)
          )
         )
         (set_local $10
          (i32.add
           (get_local $10)
           (i32.const 16777216)
          )
         )
         (set_local $9
          (i32.add
           (get_local $9)
           (i32.const 4)
          )
         )
         (br_if $label$14
          (i32.lt_s
           (get_local $0)
           (i32.const 4)
          )
         )
         (br $label$0)
        )
       )
       (set_local $19
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (br_if $label$3
        (get_local $6)
       )
       (br $label$2)
      )
      (set_local $19
       (i32.add
        (get_local $11)
        (i32.const 1)
       )
      )
      (br_if $label$2
       (i32.eqz
        (get_local $6)
       )
      )
     )
     (set_local $17
      (i32.const 0)
     )
     (set_local $16
      (i32.const 28)
     )
     (br_if $label$1
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (tee_local $0
                 (i32.shl
                  (get_local $19)
                  (i32.const 24)
                 )
                )
                (i32.const -83886080)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 70592)
          )
         )
        )
       )
       (i32.const 1)
      )
     )
     (set_local $18
      (i32.const 0)
     )
     (br_if $label$0
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (get_local $0)
                (i32.const 16777216)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 70592)
          )
         )
        )
       )
       (i32.const 1)
      )
     )
    )
    (set_local $17
     (i32.const 0)
    )
    (set_local $16
     (i32.const 5)
    )
   )
   (set_local $18
    (i32.const 0)
   )
  )
  (set_local $15
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $3
       (i32.and
        (get_local $17)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
     (i32.shl
      (get_local $1)
      (i32.const 12)
     )
    )
    (i32.shl
     (i32.and
      (get_local $19)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (set_local $0
   (i32.const 9)
  )
  (block $label$21
   (br_if $label$21
    (get_local $3)
   )
   (set_local $0
    (i32.const 24)
   )
   (br_if $label$21
    (i32.gt_u
     (i32.and
      (get_local $18)
      (i32.const 255)
     )
     (i32.const 1)
    )
   )
   (set_local $0
    (i32.shl
     (i32.shr_s
      (i32.shl
       (get_local $16)
       (i32.const 24)
      )
      (i32.const 24)
     )
     (i32.const 1)
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $15)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z13testLineThreehhcPc (; 26 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (local $17 i32)
  (i32.store8 offset=150816
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $12
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 70628)
      )
     )
    )
   )
  )
  (i32.store8 offset=150817
   (i32.const 0)
   (tee_local $0
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $12)
        (i32.const 70632)
       )
      )
     )
    )
   )
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.ne
         (get_local $2)
         (i32.const 1)
        )
       )
       (set_local $8
        (i32.add
         (get_local $12)
         (i32.const 70636)
        )
       )
       (set_local $13
        (i32.const -5)
       )
       (set_local $11
        (i32.const 0)
       )
       (set_local $12
        (i32.const 0)
       )
       (set_local $17
        (i32.const 0)
       )
       (set_local $16
        (i32.const 0)
       )
       (set_local $15
        (i32.const 0)
       )
       (set_local $5
        (i32.const 0)
       )
       (set_local $6
        (i32.const 0)
       )
       (set_local $14
        (i32.const 0)
       )
       (loop $label$5
        (i32.store8
         (i32.add
          (tee_local $4
           (get_local $13)
          )
          (i32.const 150823)
         )
         (tee_local $9
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (get_local $8)
            )
           )
          )
         )
        )
        (block $label$6
         (block $label$7
          (br_if $label$7
           (i32.eqz
            (tee_local $0
             (i32.and
              (get_local $0)
              (i32.const 255)
             )
            )
           )
          )
          (set_local $11
           (select
            (i32.add
             (get_local $11)
             (i32.const 1)
            )
            (i32.const 0)
            (tee_local $0
             (i32.eq
              (get_local $0)
              (i32.const 1)
             )
            )
           )
          )
          (set_local $12
           (select
            (get_local $12)
            (i32.const 0)
            (get_local $0)
           )
          )
          (br $label$6)
         )
         (set_local $12
          (i32.add
           (get_local $12)
           (i32.const 1)
          )
         )
        )
        (set_local $13
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (block $label$8
         (block $label$9
          (br_if $label$9
           (i32.ne
            (i32.add
             (tee_local $0
              (i32.and
               (get_local $11)
               (i32.const 255)
              )
             )
             (i32.and
              (get_local $12)
              (i32.const 255)
             )
            )
            (i32.const 5)
           )
          )
          (block $label$10
           (block $label$11
            (block $label$12
             (block $label$13
              (block $label$14
               (block $label$15
                (block $label$16
                 (block $label$17
                  (block $label$18
                   (block $label$19
                    (br_if $label$19
                     (i32.eq
                      (get_local $0)
                      (i32.const 3)
                     )
                    )
                    (br_if $label$18
                     (i32.eq
                      (get_local $0)
                      (i32.const 4)
                     )
                    )
                    (br_if $label$3
                     (i32.eq
                      (get_local $0)
                      (i32.const 5)
                     )
                    )
                    (set_local $10
                     (get_local $5)
                    )
                    (br $label$10)
                   )
                   (br_if $label$17
                    (i32.gt_s
                     (tee_local $0
                      (i32.shr_s
                       (i32.shl
                        (get_local $14)
                        (i32.const 24)
                       )
                       (i32.const 24)
                      )
                     )
                     (i32.const 3)
                    )
                   )
                   (br_if $label$12
                    (i32.ne
                     (i32.load8_u offset=32
                      (i32.const 0)
                     )
                     (i32.const 2)
                    )
                   )
                   (br_if $label$14
                    (i32.ne
                     (i32.load8_u
                      (i32.add
                       (get_local $4)
                       (i32.const 150817)
                      )
                     )
                     (i32.const 1)
                    )
                   )
                   (set_local $10
                    (get_local $5)
                   )
                   (br $label$10)
                  )
                  (br_if $label$15
                   (i32.ne
                    (i32.load8_u offset=32
                     (i32.const 0)
                    )
                    (i32.const 2)
                   )
                  )
                  (br_if $label$16
                   (i32.ne
                    (i32.load8_u
                     (i32.add
                      (get_local $4)
                      (i32.const 150817)
                     )
                    )
                    (i32.const 1)
                   )
                  )
                 )
                 (set_local $10
                  (get_local $5)
                 )
                 (br $label$10)
                )
                (br_if $label$13
                 (i32.eq
                  (i32.and
                   (get_local $9)
                   (i32.const 255)
                  )
                  (i32.const 1)
                 )
                )
               )
               (set_local $17
                (select
                 (select
                  (get_local $13)
                  (get_local $17)
                  (tee_local $0
                   (i32.lt_s
                    (tee_local $7
                     (i32.shr_s
                      (i32.shl
                       (get_local $14)
                       (i32.const 24)
                      )
                      (i32.const 24)
                     )
                    )
                    (i32.const 4)
                   )
                  )
                 )
                 (get_local $13)
                 (i32.or
                  (get_local $0)
                  (i32.eqz
                   (tee_local $6
                    (i32.and
                     (get_local $6)
                     (i32.const 255)
                    )
                   )
                  )
                 )
                )
               )
               (set_local $10
                (i32.const 0)
               )
               (set_local $15
                (i32.add
                 (select
                  (i32.const 0)
                  (get_local $15)
                  (get_local $0)
                 )
                 (i32.and
                  (i32.gt_s
                   (get_local $7)
                   (i32.const 3)
                  )
                  (i32.ne
                   (get_local $6)
                   (i32.const 0)
                  )
                 )
                )
               )
               (set_local $16
                (i32.add
                 (select
                  (i32.const 0)
                  (get_local $16)
                  (get_local $0)
                 )
                 (i32.or
                  (get_local $0)
                  (i32.ne
                   (i32.and
                    (get_local $5)
                    (i32.const 255)
                   )
                   (i32.const 0)
                  )
                 )
                )
               )
               (set_local $14
                (select
                 (i32.const 4)
                 (get_local $14)
                 (get_local $0)
                )
               )
               (br $label$11)
              )
              (br_if $label$12
               (i32.ne
                (i32.and
                 (get_local $9)
                 (i32.const 255)
                )
                (i32.const 1)
               )
              )
             )
             (set_local $9
              (i32.const 1)
             )
             (set_local $10
              (get_local $5)
             )
             (br $label$10)
            )
            (set_local $14
             (i32.const 3)
            )
            (set_local $17
             (select
              (select
               (get_local $13)
               (get_local $17)
               (tee_local $7
                (i32.lt_s
                 (get_local $0)
                 (i32.const 3)
                )
               )
              )
              (get_local $13)
              (i32.or
               (get_local $7)
               (i32.eqz
                (tee_local $6
                 (i32.and
                  (get_local $6)
                  (i32.const 255)
                 )
                )
               )
              )
             )
            )
            (set_local $10
             (i32.const 0)
            )
            (set_local $15
             (i32.add
              (select
               (i32.const 0)
               (get_local $15)
               (get_local $7)
              )
              (i32.and
               (i32.gt_s
                (get_local $0)
                (i32.const 2)
               )
               (i32.ne
                (get_local $6)
                (i32.const 0)
               )
              )
             )
            )
            (set_local $16
             (i32.add
              (select
               (i32.const 0)
               (get_local $16)
               (get_local $7)
              )
              (i32.or
               (get_local $7)
               (i32.ne
                (i32.and
                 (get_local $5)
                 (i32.const 255)
                )
                (i32.const 0)
               )
              )
             )
            )
           )
           (set_local $6
            (i32.const 1)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $4)
               (i32.const 150818)
              )
             )
            )
           )
           (set_local $11
            (i32.add
             (get_local $11)
             (i32.const -1)
            )
           )
           (set_local $6
            (i32.const 0)
           )
           (set_local $0
            (get_local $9)
           )
           (set_local $5
            (get_local $10)
           )
           (br $label$8)
          )
          (set_local $12
           (i32.add
            (get_local $12)
            (i32.const -1)
           )
          )
          (set_local $5
           (i32.const 1)
          )
         )
         (set_local $0
          (get_local $9)
         )
        )
        (set_local $8
         (i32.add
          (get_local $8)
          (i32.const 4)
         )
        )
        (br_if $label$5
         (i32.lt_s
          (get_local $13)
          (i32.const 4)
         )
        )
        (br $label$0)
       )
      )
      (set_local $8
       (i32.add
        (get_local $12)
        (i32.const 70636)
       )
      )
      (set_local $12
       (i32.const -5)
      )
      (set_local $11
       (i32.const 0)
      )
      (set_local $13
       (i32.const 0)
      )
      (set_local $17
       (i32.const 0)
      )
      (set_local $16
       (i32.const 0)
      )
      (set_local $15
       (i32.const 0)
      )
      (set_local $10
       (i32.const 0)
      )
      (set_local $5
       (i32.const 0)
      )
      (set_local $14
       (i32.const 0)
      )
      (loop $label$21
       (set_local $9
        (get_local $0)
       )
       (i32.store8
        (i32.add
         (tee_local $4
          (get_local $12)
         )
         (i32.const 150823)
        )
        (tee_local $0
         (i32.load8_u
          (i32.add
           (get_local $3)
           (i32.load8_u
            (get_local $8)
           )
          )
         )
        )
       )
       (block $label$22
        (block $label$23
         (br_if $label$23
          (i32.eqz
           (tee_local $12
            (i32.and
             (get_local $9)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $11
          (select
           (i32.add
            (get_local $11)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $12
            (i32.eq
             (get_local $12)
             (i32.and
              (get_local $2)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $13
          (select
           (get_local $13)
           (i32.const 0)
           (get_local $12)
          )
         )
         (br $label$22)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (set_local $12
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (block $label$24
        (br_if $label$24
         (i32.ne
          (i32.add
           (tee_local $9
            (i32.and
             (get_local $11)
             (i32.const 255)
            )
           )
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
          (i32.const 5)
         )
        )
        (block $label$25
         (block $label$26
          (block $label$27
           (block $label$28
            (br_if $label$28
             (i32.eq
              (get_local $9)
              (i32.const 3)
             )
            )
            (br_if $label$27
             (i32.eq
              (get_local $9)
              (i32.const 4)
             )
            )
            (br_if $label$25
             (i32.ne
              (get_local $9)
              (i32.const 5)
             )
            )
            (br $label$2)
           )
           (br_if $label$25
            (i32.gt_s
             (i32.shr_s
              (i32.shl
               (get_local $14)
               (i32.const 24)
              )
              (i32.const 24)
             )
             (i32.const 3)
            )
           )
           (set_local $6
            (i32.and
             (get_local $14)
             (i32.const 255)
            )
           )
           (set_local $14
            (i32.const 3)
           )
           (set_local $17
            (select
             (select
              (get_local $12)
              (get_local $17)
              (tee_local $9
               (i32.ne
                (get_local $6)
                (i32.const 3)
               )
              )
             )
             (get_local $12)
             (i32.or
              (get_local $9)
              (i32.eqz
               (tee_local $5
                (i32.and
                 (get_local $5)
                 (i32.const 255)
                )
               )
              )
             )
            )
           )
           (set_local $15
            (i32.add
             (select
              (i32.const 0)
              (get_local $15)
              (get_local $9)
             )
             (i32.and
              (i32.eq
               (get_local $6)
               (i32.const 3)
              )
              (i32.ne
               (get_local $5)
               (i32.const 0)
              )
             )
            )
           )
           (set_local $16
            (i32.add
             (select
              (i32.const 0)
              (get_local $16)
              (get_local $9)
             )
             (i32.or
              (get_local $9)
              (i32.ne
               (i32.and
                (get_local $10)
                (i32.const 255)
               )
               (i32.const 0)
              )
             )
            )
           )
           (br $label$26)
          )
          (set_local $17
           (select
            (select
             (get_local $12)
             (get_local $17)
             (tee_local $9
              (i32.lt_s
               (tee_local $6
                (i32.shr_s
                 (i32.shl
                  (get_local $14)
                  (i32.const 24)
                 )
                 (i32.const 24)
                )
               )
               (i32.const 4)
              )
             )
            )
            (get_local $12)
            (i32.or
             (get_local $9)
             (i32.eqz
              (tee_local $5
               (i32.and
                (get_local $5)
                (i32.const 255)
               )
              )
             )
            )
           )
          )
          (set_local $15
           (i32.add
            (select
             (i32.const 0)
             (get_local $15)
             (get_local $9)
            )
            (i32.and
             (i32.gt_s
              (get_local $6)
              (i32.const 3)
             )
             (i32.ne
              (get_local $5)
              (i32.const 0)
             )
            )
           )
          )
          (set_local $16
           (i32.add
            (select
             (i32.const 0)
             (get_local $16)
             (get_local $9)
            )
            (i32.or
             (get_local $9)
             (i32.ne
              (i32.and
               (get_local $10)
               (i32.const 255)
              )
              (i32.const 0)
             )
            )
           )
          )
          (set_local $14
           (select
            (i32.const 4)
            (get_local $14)
            (get_local $9)
           )
          )
         )
         (set_local $5
          (i32.const 1)
         )
         (set_local $10
          (i32.const 0)
         )
        )
        (block $label$29
         (br_if $label$29
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $4)
             (i32.const 150818)
            )
           )
          )
         )
         (set_local $11
          (i32.add
           (get_local $11)
           (i32.const -1)
          )
         )
         (set_local $5
          (i32.const 0)
         )
         (br $label$24)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const -1)
         )
        )
        (set_local $10
         (i32.const 1)
        )
       )
       (set_local $8
        (i32.add
         (get_local $8)
         (i32.const 4)
        )
       )
       (br_if $label$21
        (i32.lt_s
         (get_local $12)
         (i32.const 4)
        )
       )
       (br $label$0)
      )
     )
     (set_local $17
      (i32.add
       (get_local $4)
       (i32.const 1)
      )
     )
     (br $label$1)
    )
    (set_local $17
     (i32.add
      (get_local $4)
      (i32.const 1)
     )
    )
    (set_local $9
     (get_local $0)
    )
   )
   (set_local $15
    (i32.const 0)
   )
   (block $label$30
    (block $label$31
     (br_if $label$31
      (i32.ne
       (get_local $2)
       (i32.const 1)
      )
     )
     (br_if $label$31
      (i32.ne
       (i32.and
        (i32.load8_u offset=32
         (i32.const 0)
        )
        (i32.const 255)
       )
       (i32.const 2)
      )
     )
     (set_local $14
      (i32.const 28)
     )
     (br_if $label$30
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $17)
         (i32.const 150816)
        )
       )
       (i32.const 1)
      )
     )
     (br_if $label$30
      (i32.eq
       (i32.and
        (get_local $9)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
    )
    (set_local $14
     (i32.const 5)
    )
   )
   (set_local $16
    (i32.const 0)
   )
  )
  (set_local $12
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $15)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
     (i32.shl
      (get_local $1)
      (i32.const 12)
     )
    )
    (i32.shl
     (i32.and
      (get_local $17)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (block $label$32
   (block $label$33
    (br_if $label$33
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $0
     (select
      (i32.const 9)
      (i32.const 7)
      (i32.eq
       (i32.and
        (get_local $14)
        (i32.const 255)
       )
       (i32.const 4)
      )
     )
    )
    (br $label$32)
   )
   (set_local $0
    (select
     (select
      (i32.const 24)
      (tee_local $0
       (i32.shl
        (i32.shr_s
         (i32.shl
          (get_local $14)
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const 1)
       )
      )
      (i32.gt_u
       (i32.and
        (get_local $16)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
     (get_local $0)
     (i32.eq
      (i32.and
       (get_local $14)
       (i32.const 255)
      )
      (i32.const 4)
     )
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $12)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z13testLinePointhhcPcPt (; 27 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (i64.store align=2
   (get_local $4)
   (i64.const 0)
  )
  (i32.store align=2
   (i32.add
    (get_local $4)
    (i32.const 16)
   )
   (i32.const 0)
  )
  (i64.store align=2
   (i32.add
    (get_local $4)
    (i32.const 8)
   )
   (i64.const 0)
  )
  (set_local $6
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $5
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $13
   (i32.const -4)
  )
  (set_local $19
   (i32.const 0)
  )
  (set_local $18
   (i32.const 0)
  )
  (set_local $17
   (i32.const 0)
  )
  (set_local $14
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $0
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (get_local $13)
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 70592)
           )
          )
         )
        )
       )
      )
     )
     (set_local $18
      (select
       (i32.add
        (get_local $18)
        (i32.const 1)
       )
       (i32.const 0)
       (tee_local $0
        (i32.eq
         (get_local $0)
         (i32.and
          (get_local $2)
          (i32.const 255)
         )
        )
       )
      )
     )
     (set_local $19
      (select
       (get_local $19)
       (i32.const 0)
       (get_local $0)
      )
     )
     (set_local $17
      (select
       (get_local $17)
       (get_local $14)
       (get_local $0)
      )
     )
     (br $label$1)
    )
    (i32.store8
     (i32.add
      (tee_local $0
       (i32.and
        (get_local $14)
        (i32.const 255)
       )
      )
      (i32.const 151296)
     )
     (i32.add
      (get_local $13)
      (i32.const 4)
     )
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 151280)
     )
     (get_local $13)
    )
    (set_local $14
     (i32.add
      (get_local $14)
      (i32.const 1)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ne
      (i32.add
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (tee_local $7
        (i32.and
         (get_local $18)
         (i32.const 255)
        )
       )
      )
      (i32.const 5)
     )
    )
    (block $label$4
     (block $label$5
      (br_if $label$5
       (i32.ne
        (get_local $2)
        (i32.const 1)
       )
      )
      (br_if $label$5
       (i32.ne
        (i32.and
         (i32.load8_u offset=32
          (i32.const 0)
         )
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (block $label$6
       (br_if $label$6
        (i32.eq
         (i32.load8_u
          (i32.add
           (get_local $3)
           (i32.load8_u
            (i32.add
             (i32.add
              (i32.shl
               (i32.add
                (i32.shr_s
                 (i32.add
                  (tee_local $0
                   (i32.shl
                    (get_local $13)
                    (i32.const 24)
                   )
                  )
                  (i32.const -83886080)
                 )
                 (i32.const 24)
                )
                (get_local $5)
               )
               (i32.const 2)
              )
              (get_local $6)
             )
             (i32.const 70592)
            )
           )
          )
         )
         (i32.const 1)
        )
       )
       (br_if $label$5
        (i32.ne
         (i32.load8_u
          (i32.add
           (get_local $3)
           (i32.load8_u
            (i32.add
             (i32.add
              (i32.shl
               (i32.add
                (i32.shr_s
                 (i32.add
                  (get_local $0)
                  (i32.const 16777216)
                 )
                 (i32.const 24)
                )
                (get_local $5)
               )
               (i32.const 2)
              )
              (get_local $6)
             )
             (i32.const 70592)
            )
           )
          )
         )
         (i32.const 1)
        )
       )
      )
      (br_if $label$4
       (i32.ge_u
        (tee_local $0
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (tee_local $12
         (i32.and
          (get_local $14)
          (i32.const 255)
         )
        )
       )
      )
      (br_if $label$4
       (i32.ne
        (get_local $7)
        (i32.const 4)
       )
      )
      (loop $label$7
       (block $label$8
        (br_if $label$8
         (i32.lt_u
          (get_local $7)
          (i32.and
           (i32.load16_u
            (tee_local $16
             (i32.add
              (get_local $4)
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $0)
                 (i32.const 151296)
                )
               )
               (i32.const 1)
              )
             )
            )
           )
           (i32.const 14)
          )
         )
        )
        (i32.store16
         (get_local $16)
         (i32.or
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $13)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
          (i32.const 28)
         )
        )
       )
       (br_if $label$7
        (i32.ne
         (get_local $12)
         (tee_local $0
          (i32.add
           (get_local $0)
           (i32.const 1)
          )
         )
        )
       )
       (br $label$4)
      )
     )
     (br_if $label$4
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (tee_local $11
        (i32.and
         (get_local $14)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $9
      (i32.shl
       (tee_local $8
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (i32.const 1)
      )
     )
     (loop $label$9
      (block $label$10
       (br_if $label$10
        (i32.gt_u
         (i32.shr_u
          (i32.and
           (tee_local $16
            (i32.load16_u
             (tee_local $10
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $15
                 (i32.load8_u
                  (tee_local $12
                   (i32.add
                    (get_local $0)
                    (i32.const 151296)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 14)
          )
          (i32.const 1)
         )
         (get_local $7)
        )
       )
       (i32.store16
        (get_local $10)
        (i32.or
         (i32.or
          (get_local $9)
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $13)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
         )
         (i32.const 32768)
        )
       )
       (set_local $16
        (i32.load16_u
         (i32.add
          (get_local $4)
          (i32.shl
           (tee_local $15
            (i32.load8_u
             (get_local $12)
            )
           )
           (i32.const 1)
          )
         )
        )
       )
      )
      (block $label$11
       (br_if $label$11
        (i32.ne
         (i32.and
          (i32.shr_u
           (tee_local $10
            (i32.and
             (get_local $16)
             (i32.const 65535)
            )
           )
           (i32.const 1)
          )
          (i32.const 7)
         )
         (get_local $8)
        )
       )
       (block $label$12
        (br_if $label$12
         (i32.eqz
          (i32.and
           (get_local $10)
           (i32.const 32768)
          )
         )
        )
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (get_local $15)
           (i32.const 1)
          )
         )
         (i32.add
          (get_local $10)
          (i32.const 4096)
         )
        )
        (set_local $16
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $15
             (i32.load8_u
              (get_local $12)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $15)
          (i32.const 1)
         )
        )
        (i32.and
         (get_local $16)
         (i32.const 32767)
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.eqz
          (i32.and
           (tee_local $16
            (i32.load16_u
             (tee_local $10
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $15
                 (i32.load8_u
                  (get_local $12)
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 2048)
          )
         )
        )
        (i32.store16
         (get_local $10)
         (i32.add
          (get_local $16)
          (i32.const 256)
         )
        )
        (i32.store16
         (tee_local $16
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (get_local $12)
            )
            (i32.const 1)
           )
          )
         )
         (i32.or
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $13)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
          (i32.and
           (i32.load16_u
            (get_local $16)
           )
           (i32.const 65311)
          )
         )
        )
        (set_local $16
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $15
             (i32.load8_u
              (get_local $12)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $15)
          (i32.const 1)
         )
        )
        (i32.or
         (get_local $16)
         (i32.const 2048)
        )
       )
      )
      (br_if $label$9
       (i32.ne
        (get_local $11)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
     )
    )
    (block $label$14
     (br_if $label$14
      (i32.eqz
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (i32.shl
                 (get_local $13)
                 (i32.const 24)
                )
                (i32.const -67108864)
               )
               (i32.const 24)
              )
              (get_local $5)
             )
             (i32.const 2)
            )
            (get_local $6)
           )
           (i32.const 70592)
          )
         )
        )
       )
      )
     )
     (set_local $18
      (i32.add
       (get_local $18)
       (i32.const -1)
      )
     )
     (br_if $label$3
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (tee_local $12
        (i32.and
         (get_local $14)
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$15
      (i32.store16
       (tee_local $16
        (i32.add
         (get_local $4)
         (i32.shl
          (i32.load8_u
           (i32.add
            (get_local $0)
            (i32.const 151296)
           )
          )
          (i32.const 1)
         )
        )
       )
       (i32.and
        (i32.load16_u
         (get_local $16)
        )
        (i32.const 63487)
       )
      )
      (br_if $label$15
       (i32.ne
        (get_local $12)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
      (br $label$3)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const -1)
     )
    )
    (br_if $label$3
     (i32.ge_u
      (tee_local $0
       (i32.and
        (tee_local $17
         (i32.add
          (get_local $17)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $15
       (i32.and
        (get_local $14)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 151296)
     )
    )
    (set_local $16
     (get_local $17)
    )
    (loop $label$16
     (i32.store16
      (tee_local $12
       (i32.add
        (get_local $4)
        (i32.shl
         (i32.load8_u
          (get_local $0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.or
       (i32.load16_u
        (get_local $12)
       )
       (i32.const 32768)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$16
      (i32.lt_u
       (i32.and
        (tee_local $16
         (i32.add
          (get_local $16)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
       (get_local $15)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $13
      (i32.add
       (get_local $13)
       (i32.const 1)
      )
     )
     (i32.const 5)
    )
   )
  )
  (block $label$17
   (br_if $label$17
    (i32.eqz
     (tee_local $7
      (i32.and
       (get_local $14)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $11
    (i32.shl
     (get_local $1)
     (i32.const 12)
    )
   )
   (set_local $16
    (i32.const 0)
   )
   (loop $label$18
    (block $label$19
     (br_if $label$19
      (i32.eqz
       (tee_local $0
        (i32.load16_u
         (tee_local $15
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (i32.add
              (get_local $16)
              (i32.const 151296)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
      )
     )
     (set_local $13
      (i32.and
       (get_local $0)
       (i32.const 1792)
      )
     )
     (set_local $12
      (i32.const 1)
     )
     (block $label$20
      (br_if $label$20
       (i32.eq
        (tee_local $10
         (i32.and
          (i32.shr_u
           (get_local $0)
           (i32.const 1)
          )
          (i32.const 7)
         )
        )
        (i32.const 6)
       )
      )
      (block $label$21
       (br_if $label$21
        (i32.ne
         (get_local $10)
         (i32.const 4)
        )
       )
       (set_local $12
        (i32.and
         (i32.gt_u
          (i32.and
           (get_local $0)
           (i32.const 28672)
          )
          (i32.const 4096)
         )
         (i32.eqz
          (get_local $13)
         )
        )
       )
       (br $label$20)
      )
      (set_local $12
       (i32.const 0)
      )
     )
     (i32.store16
      (get_local $15)
      (i32.or
       (i32.or
        (i32.or
         (i32.or
          (i32.and
           (get_local $0)
           (i32.const 14)
          )
          (get_local $11)
         )
         (i32.ne
          (get_local $13)
          (i32.const 0)
         )
        )
        (i32.shl
         (get_local $12)
         (i32.const 4)
        )
       )
       (i32.and
        (get_local $0)
        (i32.const 2016)
       )
      )
     )
    )
    (br_if $label$18
     (i32.ne
      (get_local $7)
      (tee_local $16
       (i32.add
        (get_local $16)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $_Z17testLinePointFourhhcPcPt (; 28 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (i64.store align=2
   (get_local $4)
   (i64.const 0)
  )
  (i32.store align=2
   (i32.add
    (get_local $4)
    (i32.const 16)
   )
   (i32.const 0)
  )
  (i64.store align=2
   (i32.add
    (get_local $4)
    (i32.const 8)
   )
   (i64.const 0)
  )
  (set_local $6
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $5
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $11
   (i32.const -4)
  )
  (set_local $16
   (i32.const 0)
  )
  (set_local $12
   (i32.const 0)
  )
  (set_local $15
   (i32.const 0)
  )
  (set_local $14
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $0
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (get_local $11)
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 70592)
           )
          )
         )
        )
       )
      )
     )
     (set_local $14
      (select
       (i32.add
        (get_local $14)
        (i32.const 1)
       )
       (i32.const 0)
       (tee_local $0
        (i32.eq
         (get_local $0)
         (i32.and
          (get_local $2)
          (i32.const 255)
         )
        )
       )
      )
     )
     (set_local $16
      (select
       (get_local $16)
       (i32.const 0)
       (get_local $0)
      )
     )
     (set_local $15
      (select
       (get_local $15)
       (get_local $12)
       (get_local $0)
      )
     )
     (br $label$1)
    )
    (i32.store8
     (i32.add
      (tee_local $0
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
      )
      (i32.const 151296)
     )
     (i32.add
      (get_local $11)
      (i32.const 4)
     )
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 151280)
     )
     (get_local $11)
    )
    (set_local $12
     (i32.add
      (get_local $12)
      (i32.const 1)
     )
    )
    (set_local $16
     (i32.add
      (get_local $16)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ne
      (i32.add
       (i32.and
        (get_local $16)
        (i32.const 255)
       )
       (tee_local $0
        (i32.and
         (get_local $14)
         (i32.const 255)
        )
       )
      )
      (i32.const 5)
     )
    )
    (block $label$4
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (br_if $label$8
          (i32.eq
           (get_local $0)
           (i32.const 3)
          )
         )
         (br_if $label$4
          (i32.ne
           (get_local $0)
           (i32.const 4)
          )
         )
         (br_if $label$7
          (i32.ne
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (i32.load8_u offset=32
             (i32.const 0)
            )
            (i32.const 255)
           )
           (i32.const 2)
          )
         )
         (block $label$9
          (br_if $label$9
           (i32.eq
            (i32.load8_u
             (i32.add
              (get_local $3)
              (i32.load8_u
               (i32.add
                (i32.add
                 (i32.shl
                  (i32.add
                   (i32.shr_s
                    (i32.add
                     (tee_local $0
                      (i32.shl
                       (get_local $11)
                       (i32.const 24)
                      )
                     )
                     (i32.const -83886080)
                    )
                    (i32.const 24)
                   )
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 70592)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.ne
            (i32.load8_u
             (i32.add
              (get_local $3)
              (i32.load8_u
               (i32.add
                (i32.add
                 (i32.shl
                  (i32.add
                   (i32.shr_s
                    (i32.add
                     (get_local $0)
                     (i32.const 16777216)
                    )
                    (i32.const 24)
                   )
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 70592)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
         )
         (br_if $label$4
          (i32.ge_u
           (tee_local $0
            (i32.and
             (get_local $15)
             (i32.const 255)
            )
           )
           (tee_local $9
            (i32.and
             (get_local $12)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$10
          (i32.store16
           (i32.add
            (get_local $4)
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151296)
              )
             )
             (i32.const 1)
            )
           )
           (i32.or
            (i32.and
             (i32.shl
              (i32.sub
               (get_local $11)
               (i32.load8_u
                (i32.add
                 (get_local $0)
                 (i32.const 151280)
                )
               )
              )
              (i32.const 5)
             )
             (i32.const 8160)
            )
            (i32.const 28)
           )
          )
          (br_if $label$10
           (i32.ne
            (get_local $9)
            (tee_local $0
             (i32.add
              (get_local $0)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$4)
         )
        )
        (br_if $label$6
         (i32.ne
          (get_local $2)
          (i32.const 1)
         )
        )
        (br_if $label$6
         (i32.ne
          (i32.and
           (i32.load8_u offset=32
            (i32.const 0)
           )
           (i32.const 255)
          )
          (i32.const 2)
         )
        )
        (br_if $label$4
         (i32.eq
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (i32.add
              (i32.add
               (i32.shl
                (i32.add
                 (i32.shr_s
                  (i32.add
                   (tee_local $0
                    (i32.shl
                     (get_local $11)
                     (i32.const 24)
                    )
                   )
                   (i32.const -83886080)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 70592)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$4
         (i32.eq
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (i32.add
              (i32.add
               (i32.shl
                (i32.add
                 (i32.shr_s
                  (i32.add
                   (get_local $0)
                   (i32.const 16777216)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 70592)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$5
         (i32.lt_u
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
          (i32.and
           (get_local $12)
           (i32.const 255)
          )
         )
        )
        (br $label$4)
       )
       (br_if $label$4
        (i32.ge_u
         (tee_local $0
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
         )
         (tee_local $9
          (i32.and
           (get_local $12)
           (i32.const 255)
          )
         )
        )
       )
       (loop $label$11
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.const 151296)
            )
           )
           (i32.const 1)
          )
         )
         (i32.or
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $11)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
          (i32.const 10)
         )
        )
        (br_if $label$11
         (i32.ne
          (get_local $9)
          (tee_local $0
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
         )
        )
        (br $label$4)
       )
      )
      (br_if $label$4
       (i32.ge_u
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
        (i32.and
         (get_local $12)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $7
      (i32.and
       (get_local $12)
       (i32.const 255)
      )
     )
     (set_local $0
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
     (loop $label$12
      (block $label$13
       (br_if $label$13
        (i32.gt_u
         (i32.and
          (tee_local $9
           (i32.load16_u
            (tee_local $8
             (i32.add
              (get_local $4)
              (i32.shl
               (tee_local $13
                (i32.load8_u
                 (tee_local $10
                  (i32.add
                   (get_local $0)
                   (i32.const 151296)
                  )
                 )
                )
               )
               (i32.const 1)
              )
             )
            )
           )
          )
          (i32.const 8)
         )
         (i32.const 7)
        )
       )
       (i32.store16
        (get_local $8)
        (i32.or
         (i32.and
          (i32.shl
           (i32.sub
            (get_local $11)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 151280)
             )
            )
           )
           (i32.const 5)
          )
          (i32.const 8160)
         )
         (i32.const 32776)
        )
       )
       (set_local $9
        (i32.load16_u
         (i32.add
          (get_local $4)
          (i32.shl
           (tee_local $13
            (i32.load8_u
             (get_local $10)
            )
           )
           (i32.const 1)
          )
         )
        )
       )
      )
      (block $label$14
       (br_if $label$14
        (i32.ne
         (i32.and
          (get_local $9)
          (i32.const 14)
         )
         (i32.const 8)
        )
       )
       (block $label$15
        (br_if $label$15
         (i32.eqz
          (i32.and
           (tee_local $8
            (i32.and
             (get_local $9)
             (i32.const 65535)
            )
           )
           (i32.const 32768)
          )
         )
        )
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (get_local $13)
           (i32.const 1)
          )
         )
         (i32.add
          (get_local $8)
          (i32.const 4096)
         )
        )
        (set_local $9
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $13
             (i32.load8_u
              (get_local $10)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $13)
          (i32.const 1)
         )
        )
        (i32.and
         (get_local $9)
         (i32.const 32767)
        )
       )
       (block $label$16
        (br_if $label$16
         (i32.eqz
          (i32.and
           (tee_local $9
            (i32.load16_u
             (tee_local $8
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $13
                 (i32.load8_u
                  (get_local $10)
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 2048)
          )
         )
        )
        (i32.store16
         (get_local $8)
         (i32.add
          (get_local $9)
          (i32.const 256)
         )
        )
        (i32.store16
         (tee_local $9
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (get_local $10)
            )
            (i32.const 1)
           )
          )
         )
         (i32.or
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $11)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
          (i32.and
           (i32.load16_u
            (get_local $9)
           )
           (i32.const 65311)
          )
         )
        )
        (set_local $9
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $13
             (i32.load8_u
              (get_local $10)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $13)
          (i32.const 1)
         )
        )
        (i32.or
         (get_local $9)
         (i32.const 2048)
        )
       )
      )
      (br_if $label$12
       (i32.ne
        (get_local $7)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
     )
    )
    (block $label$17
     (br_if $label$17
      (i32.eqz
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (i32.shl
                 (get_local $11)
                 (i32.const 24)
                )
                (i32.const -67108864)
               )
               (i32.const 24)
              )
              (get_local $5)
             )
             (i32.const 2)
            )
            (get_local $6)
           )
           (i32.const 70592)
          )
         )
        )
       )
      )
     )
     (set_local $14
      (i32.add
       (get_local $14)
       (i32.const -1)
      )
     )
     (br_if $label$3
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
       )
       (tee_local $10
        (i32.and
         (get_local $12)
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$18
      (i32.store16
       (tee_local $9
        (i32.add
         (get_local $4)
         (i32.shl
          (i32.load8_u
           (i32.add
            (get_local $0)
            (i32.const 151296)
           )
          )
          (i32.const 1)
         )
        )
       )
       (i32.and
        (i32.load16_u
         (get_local $9)
        )
        (i32.const 63487)
       )
      )
      (br_if $label$18
       (i32.ne
        (get_local $10)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
      (br $label$3)
     )
    )
    (set_local $16
     (i32.add
      (get_local $16)
      (i32.const -1)
     )
    )
    (br_if $label$3
     (i32.ge_u
      (tee_local $0
       (i32.and
        (tee_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $13
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 151296)
     )
    )
    (set_local $9
     (get_local $15)
    )
    (loop $label$19
     (i32.store16
      (tee_local $10
       (i32.add
        (get_local $4)
        (i32.shl
         (i32.load8_u
          (get_local $0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.or
       (i32.load16_u
        (get_local $10)
       )
       (i32.const 32768)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$19
      (i32.lt_u
       (i32.and
        (tee_local $9
         (i32.add
          (get_local $9)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
       (get_local $13)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $11
      (i32.add
       (get_local $11)
       (i32.const 1)
      )
     )
     (i32.const 5)
    )
   )
  )
  (block $label$20
   (br_if $label$20
    (i32.eqz
     (tee_local $13
      (i32.and
       (get_local $12)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $16
    (i32.shl
     (get_local $1)
     (i32.const 12)
    )
   )
   (set_local $0
    (i32.const 0)
   )
   (loop $label$21
    (block $label$22
     (br_if $label$22
      (i32.eqz
       (tee_local $9
        (i32.load16_u
         (tee_local $11
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 151296)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
      )
     )
     (set_local $10
      (i32.const 9)
     )
     (block $label$23
      (br_if $label$23
       (i32.and
        (get_local $9)
        (i32.const 1792)
       )
      )
      (set_local $10
       (select
        (i32.const 24)
        (i32.and
         (get_local $9)
         (i32.const 30)
        )
        (i32.gt_u
         (i32.and
          (get_local $9)
          (i32.const 28672)
         )
         (i32.const 4096)
        )
       )
      )
     )
     (i32.store16
      (get_local $11)
      (i32.or
       (i32.or
        (i32.and
         (get_local $9)
         (i32.const 2016)
        )
        (get_local $16)
       )
       (get_local $10)
      )
     )
    )
    (br_if $label$21
     (i32.ne
      (get_local $13)
      (tee_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $_Z18testLinePointThreehhcPcPt (; 29 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (i64.store align=2
   (get_local $4)
   (i64.const 0)
  )
  (i32.store align=2
   (i32.add
    (get_local $4)
    (i32.const 16)
   )
   (i32.const 0)
  )
  (i64.store align=2
   (i32.add
    (get_local $4)
    (i32.const 8)
   )
   (i64.const 0)
  )
  (set_local $6
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $5
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $14
   (i32.const -4)
  )
  (set_local $19
   (i32.const 0)
  )
  (set_local $18
   (i32.const 0)
  )
  (set_local $15
   (i32.const 0)
  )
  (set_local $17
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $0
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (get_local $14)
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 70592)
           )
          )
         )
        )
       )
      )
     )
     (set_local $18
      (select
       (i32.add
        (get_local $18)
        (i32.const 1)
       )
       (i32.const 0)
       (tee_local $0
        (i32.eq
         (get_local $0)
         (i32.and
          (get_local $2)
          (i32.const 255)
         )
        )
       )
      )
     )
     (set_local $19
      (select
       (get_local $19)
       (i32.const 0)
       (get_local $0)
      )
     )
     (set_local $17
      (select
       (get_local $17)
       (get_local $15)
       (get_local $0)
      )
     )
     (br $label$1)
    )
    (i32.store8
     (i32.add
      (tee_local $0
       (i32.and
        (get_local $15)
        (i32.const 255)
       )
      )
      (i32.const 151296)
     )
     (i32.add
      (get_local $14)
      (i32.const 4)
     )
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 151280)
     )
     (get_local $14)
    )
    (set_local $15
     (i32.add
      (get_local $15)
      (i32.const 1)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ne
      (i32.add
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (tee_local $7
        (i32.and
         (get_local $18)
         (i32.const 255)
        )
       )
      )
      (i32.const 5)
     )
    )
    (block $label$4
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (br_if $label$8
          (i32.ne
           (get_local $7)
           (i32.const 4)
          )
         )
         (br_if $label$7
          (i32.ne
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (i32.load8_u offset=32
             (i32.const 0)
            )
            (i32.const 255)
           )
           (i32.const 2)
          )
         )
         (block $label$9
          (br_if $label$9
           (i32.eq
            (i32.load8_u
             (i32.add
              (get_local $3)
              (i32.load8_u
               (i32.add
                (i32.add
                 (i32.shl
                  (i32.add
                   (i32.shr_s
                    (i32.add
                     (tee_local $0
                      (i32.shl
                       (get_local $14)
                       (i32.const 24)
                      )
                     )
                     (i32.const -83886080)
                    )
                    (i32.const 24)
                   )
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 70592)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.ne
            (i32.load8_u
             (i32.add
              (get_local $3)
              (i32.load8_u
               (i32.add
                (i32.add
                 (i32.shl
                  (i32.add
                   (i32.shr_s
                    (i32.add
                     (get_local $0)
                     (i32.const 16777216)
                    )
                    (i32.const 24)
                   )
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 70592)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
         )
         (br_if $label$4
          (i32.ge_u
           (tee_local $0
            (i32.and
             (get_local $17)
             (i32.const 255)
            )
           )
           (tee_local $12
            (i32.and
             (get_local $15)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$10
          (i32.store16
           (i32.add
            (get_local $4)
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151296)
              )
             )
             (i32.const 1)
            )
           )
           (i32.or
            (i32.and
             (i32.shl
              (i32.sub
               (get_local $14)
               (i32.load8_u
                (i32.add
                 (get_local $0)
                 (i32.const 151280)
                )
               )
              )
              (i32.const 5)
             )
             (i32.const 8160)
            )
            (i32.const 28)
           )
          )
          (br_if $label$10
           (i32.ne
            (get_local $12)
            (tee_local $0
             (i32.add
              (get_local $0)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$4)
         )
        )
        (br_if $label$4
         (i32.ne
          (i32.and
           (get_local $18)
           (i32.const 254)
          )
          (i32.const 2)
         )
        )
        (br_if $label$6
         (i32.ne
          (get_local $2)
          (i32.const 1)
         )
        )
        (br_if $label$6
         (i32.ne
          (i32.and
           (i32.load8_u offset=32
            (i32.const 0)
           )
           (i32.const 255)
          )
          (i32.const 2)
         )
        )
        (br_if $label$4
         (i32.eq
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (i32.add
              (i32.add
               (i32.shl
                (i32.add
                 (i32.shr_s
                  (i32.add
                   (tee_local $0
                    (i32.shl
                     (get_local $14)
                     (i32.const 24)
                    )
                   )
                   (i32.const -83886080)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 70592)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$4
         (i32.eq
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (i32.add
              (i32.add
               (i32.shl
                (i32.add
                 (i32.shr_s
                  (i32.add
                   (get_local $0)
                   (i32.const 16777216)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 70592)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$5
         (i32.lt_u
          (i32.and
           (get_local $17)
           (i32.const 255)
          )
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
         )
        )
        (br $label$4)
       )
       (br_if $label$4
        (i32.ge_u
         (tee_local $0
          (i32.and
           (get_local $17)
           (i32.const 255)
          )
         )
         (tee_local $12
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
         )
        )
       )
       (loop $label$11
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.const 151296)
            )
           )
           (i32.const 1)
          )
         )
         (i32.or
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $14)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
          (i32.const 10)
         )
        )
        (br_if $label$11
         (i32.ne
          (get_local $12)
          (tee_local $0
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
         )
        )
        (br $label$4)
       )
      )
      (br_if $label$4
       (i32.ge_u
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $10
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
     (set_local $0
      (i32.and
       (get_local $17)
       (i32.const 255)
      )
     )
     (set_local $9
      (i32.shl
       (tee_local $8
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (i32.const 1)
      )
     )
     (loop $label$12
      (block $label$13
       (br_if $label$13
        (i32.gt_u
         (i32.shr_u
          (i32.and
           (tee_local $12
            (i32.load16_u
             (tee_local $11
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $16
                 (i32.load8_u
                  (tee_local $13
                   (i32.add
                    (get_local $0)
                    (i32.const 151296)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 14)
          )
          (i32.const 1)
         )
         (get_local $7)
        )
       )
       (i32.store16
        (get_local $11)
        (i32.or
         (i32.or
          (get_local $9)
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $14)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
         )
         (i32.const 32768)
        )
       )
       (set_local $12
        (i32.load16_u
         (i32.add
          (get_local $4)
          (i32.shl
           (tee_local $16
            (i32.load8_u
             (get_local $13)
            )
           )
           (i32.const 1)
          )
         )
        )
       )
      )
      (block $label$14
       (br_if $label$14
        (i32.ne
         (i32.and
          (i32.shr_u
           (tee_local $11
            (i32.and
             (get_local $12)
             (i32.const 65535)
            )
           )
           (i32.const 1)
          )
          (i32.const 7)
         )
         (get_local $8)
        )
       )
       (block $label$15
        (br_if $label$15
         (i32.eqz
          (i32.and
           (get_local $11)
           (i32.const 32768)
          )
         )
        )
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (get_local $16)
           (i32.const 1)
          )
         )
         (i32.add
          (get_local $11)
          (i32.const 4096)
         )
        )
        (set_local $12
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $16
             (i32.load8_u
              (get_local $13)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $16)
          (i32.const 1)
         )
        )
        (i32.and
         (get_local $12)
         (i32.const 32767)
        )
       )
       (block $label$16
        (br_if $label$16
         (i32.eqz
          (i32.and
           (tee_local $12
            (i32.load16_u
             (tee_local $11
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $16
                 (i32.load8_u
                  (get_local $13)
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 2048)
          )
         )
        )
        (i32.store16
         (get_local $11)
         (i32.add
          (get_local $12)
          (i32.const 256)
         )
        )
        (i32.store16
         (tee_local $12
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (get_local $13)
            )
            (i32.const 1)
           )
          )
         )
         (i32.or
          (i32.and
           (i32.shl
            (i32.sub
             (get_local $14)
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 151280)
              )
             )
            )
            (i32.const 5)
           )
           (i32.const 8160)
          )
          (i32.and
           (i32.load16_u
            (get_local $12)
           )
           (i32.const 65311)
          )
         )
        )
        (set_local $12
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $16
             (i32.load8_u
              (get_local $13)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $16)
          (i32.const 1)
         )
        )
        (i32.or
         (get_local $12)
         (i32.const 2048)
        )
       )
      )
      (br_if $label$12
       (i32.ne
        (get_local $10)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
     )
    )
    (block $label$17
     (br_if $label$17
      (i32.eqz
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (i32.shl
                 (get_local $14)
                 (i32.const 24)
                )
                (i32.const -67108864)
               )
               (i32.const 24)
              )
              (get_local $5)
             )
             (i32.const 2)
            )
            (get_local $6)
           )
           (i32.const 70592)
          )
         )
        )
       )
      )
     )
     (set_local $18
      (i32.add
       (get_local $18)
       (i32.const -1)
      )
     )
     (br_if $label$3
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (tee_local $13
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$18
      (i32.store16
       (tee_local $12
        (i32.add
         (get_local $4)
         (i32.shl
          (i32.load8_u
           (i32.add
            (get_local $0)
            (i32.const 151296)
           )
          )
          (i32.const 1)
         )
        )
       )
       (i32.and
        (i32.load16_u
         (get_local $12)
        )
        (i32.const 63487)
       )
      )
      (br_if $label$18
       (i32.ne
        (get_local $13)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
      (br $label$3)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const -1)
     )
    )
    (br_if $label$3
     (i32.ge_u
      (tee_local $0
       (i32.and
        (tee_local $17
         (i32.add
          (get_local $17)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $16
       (i32.and
        (get_local $15)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 151296)
     )
    )
    (set_local $12
     (get_local $17)
    )
    (loop $label$19
     (i32.store16
      (tee_local $13
       (i32.add
        (get_local $4)
        (i32.shl
         (i32.load8_u
          (get_local $0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.or
       (i32.load16_u
        (get_local $13)
       )
       (i32.const 32768)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$19
      (i32.lt_u
       (i32.and
        (tee_local $12
         (i32.add
          (get_local $12)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
       (get_local $16)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $14
      (i32.add
       (get_local $14)
       (i32.const 1)
      )
     )
     (i32.const 5)
    )
   )
  )
  (block $label$20
   (br_if $label$20
    (i32.eqz
     (tee_local $16
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $19
    (i32.shl
     (get_local $1)
     (i32.const 12)
    )
   )
   (set_local $12
    (i32.const 0)
   )
   (loop $label$21
    (block $label$22
     (br_if $label$22
      (i32.eqz
       (tee_local $0
        (i32.load16_u
         (tee_local $14
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (i32.add
              (get_local $12)
              (i32.const 151296)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
      )
     )
     (set_local $13
      (i32.and
       (i32.shr_u
        (get_local $0)
        (i32.const 1)
       )
       (i32.const 15)
      )
     )
     (block $label$23
      (block $label$24
       (br_if $label$24
        (i32.eqz
         (i32.and
          (get_local $0)
          (i32.const 1792)
         )
        )
       )
       (set_local $13
        (select
         (i32.const 9)
         (i32.const 7)
         (i32.eq
          (get_local $13)
          (i32.const 4)
         )
        )
       )
       (br $label$23)
      )
      (set_local $13
       (select
        (select
         (i32.const 24)
         (tee_local $18
          (i32.shl
           (get_local $13)
           (i32.const 1)
          )
         )
         (i32.eq
          (get_local $13)
          (i32.const 4)
         )
        )
        (get_local $18)
        (i32.gt_u
         (i32.and
          (get_local $0)
          (i32.const 28672)
         )
         (i32.const 4096)
        )
       )
      )
     )
     (i32.store16
      (get_local $14)
      (i32.or
       (i32.or
        (i32.and
         (get_local $13)
         (i32.const 255)
        )
        (get_local $19)
       )
       (i32.and
        (get_local $0)
        (i32.const 2016)
       )
      )
     )
    )
    (br_if $label$21
     (i32.ne
      (get_local $16)
      (tee_local $12
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $_Z17getBlockFourPointhPct (; 30 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eq
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (tee_local $3
              (i32.and
               (i32.shr_u
                (get_local $2)
                (i32.const 5)
               )
               (i32.const 7)
              )
             )
             (tee_local $4
              (i32.mul
               (get_local $0)
               (i32.const 29)
              )
             )
            )
            (i32.const 2)
           )
           (tee_local $5
            (i32.or
             (i32.shr_u
              (get_local $2)
              (i32.const 12)
             )
             (i32.const 56)
            )
           )
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i32.eq
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $6
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -16777216)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$4
     (br_if $label$4
      (i32.eq
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $6)
               (i32.const -33554432)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (br_if $label$0
     (i32.eq
      (tee_local $2
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (tee_local $3
               (i32.shl
                (get_local $3)
                (i32.const 24)
               )
              )
              (i32.const -50331648)
             )
             (i32.const 24)
            )
            (get_local $4)
           )
           (i32.const 2)
          )
          (get_local $5)
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$0
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $2)
       )
      )
      (i32.const 255)
     )
    )
   )
   (return
    (get_local $2)
   )
  )
  (i32.and
   (select
    (i32.const -31)
    (select
     (i32.const -31)
     (tee_local $2
      (i32.load8_u
       (i32.add
        (i32.add
         (i32.shl
          (i32.add
           (i32.shr_s
            (i32.add
             (get_local $3)
             (i32.const -67108864)
            )
            (i32.const 24)
           )
           (get_local $4)
          )
          (i32.const 2)
         )
         (get_local $5)
        )
        (i32.const 70592)
       )
      )
     )
     (i32.load8_u
      (i32.add
       (get_local $1)
       (get_local $2)
      )
     )
    )
    (i32.eq
     (get_local $2)
     (get_local $0)
    )
   )
   (i32.const 255)
  )
 )
 (func $_Z19getBlockThreePointshPct (; 31 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (i32.store offset=151264
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $6
   (i32.shr_u
    (get_local $2)
    (i32.const 12)
   )
  )
  (set_local $3
   (i32.and
    (i32.shr_u
     (get_local $2)
     (i32.const 5)
    )
    (i32.const 7)
   )
  )
  (set_local $4
   (i32.const 1)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eq
      (tee_local $2
       (i32.and
        (i32.shr_u
         (get_local $2)
         (i32.const 8)
        )
        (i32.const 7)
       )
      )
      (i32.const 1)
     )
    )
    (br_if $label$0
     (i32.ne
      (get_local $2)
      (i32.const 2)
     )
    )
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (get_local $3)
              (tee_local $4
               (i32.mul
                (get_local $0)
                (i32.const 29)
               )
              )
             )
             (i32.const 2)
            )
            (tee_local $5
             (i32.or
              (get_local $6)
              (i32.const 56)
             )
            )
           )
           (i32.const 70592)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 255)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (block $label$4
      (br_if $label$4
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (tee_local $7
                 (i32.shl
                  (get_local $3)
                  (i32.const 24)
                 )
                )
                (i32.const -16777216)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 70592)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 254)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (block $label$5
      (br_if $label$5
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (get_local $7)
                (i32.const -33554432)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 70592)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 253)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (block $label$6
      (br_if $label$6
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (tee_local $7
                 (i32.shl
                  (get_local $3)
                  (i32.const 24)
                 )
                )
                (i32.const -50331648)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 70592)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 252)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (br_if $label$0
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $7)
               (i32.const -67108864)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $2
      (i32.const 251)
     )
     (br_if $label$0
      (i32.and
       (i32.load8_u
        (i32.add
         (get_local $1)
         (get_local $6)
        )
       )
       (i32.const 255)
      )
     )
    )
    (loop $label$7
     (block $label$8
      (br_if $label$8
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.shl
                (i32.add
                 (get_local $3)
                 (get_local $2)
                )
                (i32.const 24)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 70592)
          )
         )
        )
        (get_local $0)
       )
      )
      (br_if $label$8
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
      (i32.store8 offset=151264
       (i32.const 0)
       (tee_local $7
        (i32.add
         (i32.load8_u offset=151264
          (i32.const 0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store8
       (i32.add
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
        (i32.const 151264)
       )
       (get_local $6)
      )
     )
     (br_if $label$7
      (i32.gt_s
       (tee_local $2
        (i32.shr_s
         (i32.add
          (i32.shl
           (get_local $2)
           (i32.const 24)
          )
          (i32.const -16777216)
         )
         (i32.const 24)
        )
       )
       (i32.const -6)
      )
     )
     (br $label$0)
    )
   )
   (block $label$9
    (br_if $label$9
     (i32.eq
      (tee_local $5
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (get_local $3)
            (tee_local $2
             (i32.mul
              (get_local $0)
              (i32.const 29)
             )
            )
           )
           (i32.const 2)
          )
          (tee_local $6
           (i32.or
            (get_local $6)
            (i32.const 56)
           )
          )
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$9
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $5)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=151265
     (i32.const 0)
     (get_local $5)
    )
    (i32.store8 offset=151264
     (i32.const 0)
     (i32.const 1)
    )
    (set_local $4
     (i32.const 2)
    )
   )
   (block $label$10
    (br_if $label$10
     (i32.eq
      (tee_local $5
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (tee_local $7
               (i32.shl
                (get_local $3)
                (i32.const 24)
               )
              )
              (i32.const -16777216)
             )
             (i32.const 24)
            )
            (get_local $2)
           )
           (i32.const 2)
          )
          (get_local $6)
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$10
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $5)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=151264
     (i32.const 0)
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
      (i32.const 151264)
     )
     (get_local $5)
    )
   )
   (block $label$11
    (br_if $label$11
     (i32.eq
      (tee_local $4
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (get_local $7)
              (i32.const -33554432)
             )
             (i32.const 24)
            )
            (get_local $2)
           )
           (i32.const 2)
          )
          (get_local $6)
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$11
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=151264
     (i32.const 0)
     (tee_local $5
      (i32.add
       (i32.load8_u offset=151264
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
      (i32.const 151264)
     )
     (get_local $4)
    )
   )
   (block $label$12
    (br_if $label$12
     (i32.eq
      (tee_local $4
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (tee_local $5
               (i32.shl
                (get_local $3)
                (i32.const 24)
               )
              )
              (i32.const -50331648)
             )
             (i32.const 24)
            )
            (get_local $2)
           )
           (i32.const 2)
          )
          (get_local $6)
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$12
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=151264
     (i32.const 0)
     (tee_local $7
      (i32.add
       (i32.load8_u offset=151264
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $7)
       (i32.const 255)
      )
      (i32.const 151264)
     )
     (get_local $4)
    )
   )
   (block $label$13
    (br_if $label$13
     (i32.eq
      (tee_local $4
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (get_local $5)
              (i32.const -67108864)
             )
             (i32.const 24)
            )
            (get_local $2)
           )
           (i32.const 2)
          )
          (get_local $6)
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$13
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=151264
     (i32.const 0)
     (tee_local $5
      (i32.add
       (i32.load8_u offset=151264
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
      (i32.const 151264)
     )
     (get_local $4)
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $2
      (i32.load8_u
       (i32.add
        (i32.add
         (i32.shl
          (i32.add
           (i32.shr_s
            (i32.add
             (i32.shl
              (get_local $3)
              (i32.const 24)
             )
             (i32.const -83886080)
            )
            (i32.const 24)
           )
           (get_local $2)
          )
          (i32.const 2)
         )
         (get_local $6)
        )
        (i32.const 70592)
       )
      )
     )
     (get_local $0)
    )
   )
   (br_if $label$0
    (i32.and
     (i32.load8_u
      (i32.add
       (get_local $1)
       (get_local $2)
      )
     )
     (i32.const 255)
    )
   )
   (i32.store8 offset=151264
    (i32.const 0)
    (tee_local $6
     (i32.add
      (i32.load8_u offset=151264
       (i32.const 0)
      )
      (i32.const 1)
     )
    )
   )
   (i32.store8
    (i32.add
     (i32.and
      (get_local $6)
      (i32.const 255)
     )
     (i32.const 151264)
    )
    (get_local $2)
   )
  )
  (i32.load offset=151264
   (i32.const 0)
  )
 )
 (func $_Z16getFreeFourPointhPct (; 32 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (i32.store offset=151264
   (i32.const 0)
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (tee_local $3
              (i32.and
               (i32.shr_u
                (get_local $2)
                (i32.const 5)
               )
               (i32.const 7)
              )
             )
             (tee_local $4
              (i32.mul
               (get_local $0)
               (i32.const 29)
              )
             )
            )
            (i32.const 2)
           )
           (tee_local $5
            (i32.or
             (i32.shr_u
              (get_local $2)
              (i32.const 12)
             )
             (i32.const 56)
            )
           )
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 255)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $7
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -16777216)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 254)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$4
     (br_if $label$4
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $7)
               (i32.const -33554432)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 253)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$5
     (br_if $label$5
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $7
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -50331648)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 252)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (br_if $label$0
     (i32.eq
      (tee_local $6
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (get_local $7)
              (i32.const -67108864)
             )
             (i32.const 24)
            )
            (get_local $4)
           )
           (i32.const 2)
          )
          (get_local $5)
         )
         (i32.const 70592)
        )
       )
      )
      (get_local $0)
     )
    )
    (set_local $8
     (i32.const 251)
    )
    (br_if $label$0
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $6)
       )
      )
      (i32.const 255)
     )
    )
   )
   (loop $label$6
    (block $label$7
     (br_if $label$7
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.shl
               (i32.add
                (get_local $3)
                (get_local $8)
               )
               (i32.const 24)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 70592)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$7
      (i32.and
       (i32.load8_u
        (i32.add
         (get_local $1)
         (get_local $6)
        )
       )
       (i32.const 255)
      )
     )
     (i32.store8 offset=151264
      (i32.const 0)
      (tee_local $7
       (i32.add
        (i32.load8_u offset=151264
         (i32.const 0)
        )
        (i32.const 1)
       )
      )
     )
     (i32.store8
      (i32.add
       (i32.and
        (get_local $7)
        (i32.const 255)
       )
       (i32.const 151264)
      )
      (get_local $6)
     )
    )
    (br_if $label$6
     (i32.gt_s
      (tee_local $8
       (i32.shr_s
        (i32.add
         (i32.shl
          (get_local $8)
          (i32.const 24)
         )
         (i32.const -16777216)
        )
        (i32.const 24)
       )
      )
      (i32.const -6)
     )
    )
   )
  )
  (i32.store8 offset=151264
   (i32.const 0)
   (i32.and
    (i32.shr_u
     (get_local $2)
     (i32.const 8)
    )
    (i32.const 7)
   )
  )
  (i32.load offset=151264
   (i32.const 0)
  )
 )
 (func $_Z6isFoulhPc (; 33 ;) (param $0 i32) (param $1 i32) (result i32)
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
  (set_local $3
   (i32.load8_u
    (tee_local $2
     (i32.add
      (get_local $1)
      (get_local $0)
     )
    )
   )
  )
  (set_local $6
   (i32.const 1)
  )
  (i32.store8
   (get_local $2)
   (i32.const 1)
  )
  (set_local $7
   (i32.const 0)
  )
  (i32.store8 offset=150835
   (i32.const 0)
   (get_local $0)
  )
  (i32.store8 offset=150834
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=150832
   (i32.const 0)
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eq
     (tee_local $5
      (i32.and
       (tee_local $4
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 0)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (set_local $8
    (i32.const 0)
   )
   (block $label$1
    (br_if $label$1
     (i32.gt_u
      (get_local $5)
      (i32.const 15)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.le_u
       (get_local $5)
       (i32.const 7)
      )
     )
     (set_local $7
      (i32.const 1)
     )
     (set_local $6
      (i32.const 0)
     )
     (set_local $8
      (i32.const 0)
     )
     (br $label$1)
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $7
     (i32.const 0)
    )
    (set_local $8
     (i32.const 0)
    )
    (br_if $label$1
     (i32.ne
      (get_local $5)
      (i32.const 7)
     )
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $8
     (i32.const 1)
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $5
        (i32.load8_u offset=150833
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 150836)
     )
     (i32.and
      (get_local $4)
      (i32.const 36863)
     )
    )
    (i32.store8 offset=150833
     (i32.const 0)
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (set_local $7
     (i32.const 0)
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $5
      (i32.and
       (tee_local $4
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 1)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (block $label$3
    (block $label$4
     (br_if $label$4
      (i32.le_u
       (get_local $5)
       (i32.const 15)
      )
     )
     (set_local $6
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br $label$3)
    )
    (block $label$5
     (br_if $label$5
      (i32.le_u
       (get_local $5)
       (i32.const 7)
      )
     )
     (set_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br $label$3)
    )
    (br_if $label$3
     (i32.ne
      (get_local $5)
      (i32.const 7)
     )
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $5
        (i32.load8_u offset=150833
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 150836)
     )
     (i32.or
      (i32.and
       (get_local $4)
       (i32.const 36863)
      )
      (i32.const 4096)
     )
    )
    (i32.store8 offset=150833
     (i32.const 0)
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 1)
     )
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $5
      (i32.and
       (tee_local $4
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 2)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (block $label$6
    (block $label$7
     (br_if $label$7
      (i32.le_u
       (get_local $5)
       (i32.const 15)
      )
     )
     (set_local $6
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br $label$6)
    )
    (block $label$8
     (br_if $label$8
      (i32.le_u
       (get_local $5)
       (i32.const 7)
      )
     )
     (set_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br $label$6)
    )
    (br_if $label$6
     (i32.ne
      (get_local $5)
      (i32.const 7)
     )
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $5
        (i32.load8_u offset=150833
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 150836)
     )
     (i32.or
      (i32.and
       (get_local $4)
       (i32.const 36863)
      )
      (i32.const 8192)
     )
    )
    (i32.store8 offset=150833
     (i32.const 0)
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 1)
     )
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $0
      (i32.and
       (tee_local $5
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 3)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (block $label$9
    (block $label$10
     (br_if $label$10
      (i32.gt_u
       (get_local $0)
       (i32.const 15)
      )
     )
     (block $label$11
      (block $label$12
       (br_if $label$12
        (i32.le_u
         (get_local $0)
         (i32.const 7)
        )
       )
       (set_local $7
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (br $label$11)
      )
      (br_if $label$11
       (i32.ne
        (get_local $0)
        (i32.const 7)
       )
      )
      (i32.store16
       (i32.add
        (i32.shl
         (tee_local $0
          (i32.load8_u offset=150833
           (i32.const 0)
          )
         )
         (i32.const 1)
        )
        (i32.const 150836)
       )
       (i32.or
        (i32.and
         (get_local $5)
         (i32.const 36863)
        )
        (i32.const 12288)
       )
      )
      (i32.store8 offset=150833
       (i32.const 0)
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
      (set_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
     (br_if $label$10
      (i32.and
       (get_local $6)
       (i32.const 255)
      )
     )
     (br_if $label$10
      (i32.gt_s
       (i32.shr_s
        (i32.shl
         (get_local $7)
         (i32.const 24)
        )
        (i32.const 24)
       )
       (i32.const 1)
      )
     )
     (br_if $label$0
      (i32.lt_s
       (i32.shr_s
        (i32.shl
         (get_local $8)
         (i32.const 24)
        )
        (i32.const 24)
       )
       (i32.const 2)
      )
     )
     (set_local $0
      (i32.const 0)
     )
     (set_local $5
      (i32.const 0)
     )
     (br $label$9)
    )
    (i32.store8 offset=150832
     (i32.const 0)
     (i32.const 2)
    )
    (br $label$0)
   )
   (loop $label$13
    (set_local $6
     (get_local $5)
    )
    (set_local $7
     (i32.load8_u
      (tee_local $4
       (i32.add
        (tee_local $5
         (i32.mul
          (get_local $0)
          (i32.const 12)
         )
        )
        (i32.const 150832)
       )
      )
     )
    )
    (block $label$14
     (block $label$15
      (block $label$16
       (block $label$17
        (block $label$18
         (block $label$19
          (br_if $label$19
           (i32.and
            (get_local $0)
            (i32.const 1)
           )
          )
          (set_local $0
           (i32.load8_u
            (i32.add
             (i32.or
              (get_local $5)
              (i32.const 3)
             )
             (i32.const 150832)
            )
           )
          )
          (br_if $label$18
           (i32.lt_u
            (get_local $7)
            (i32.const 2)
           )
          )
          (i32.store8
           (i32.add
            (get_local $1)
            (get_local $0)
           )
           (i32.const 0)
          )
          (set_local $5
           (i32.add
            (get_local $6)
            (i32.const -1)
           )
          )
          (br_if $label$14
           (i32.and
            (get_local $6)
            (i32.const 255)
           )
          )
          (i32.store8 offset=150832
           (i32.const 0)
           (i32.const 2)
          )
          (br $label$14)
         )
         (br_if $label$17
          (i32.ne
           (get_local $7)
           (i32.const 1)
          )
         )
         (i32.store8
          (tee_local $0
           (i32.add
            (i32.mul
             (i32.shr_s
              (i32.shl
               (tee_local $5
                (i32.add
                 (get_local $6)
                 (i32.const -1)
                )
               )
               (i32.const 24)
              )
              (i32.const 24)
             )
             (i32.const 12)
            )
            (i32.const 150832)
           )
          )
          (i32.add
           (i32.load8_u
            (get_local $0)
           )
           (i32.const 1)
          )
         )
         (br $label$14)
        )
        (br_if $label$16
         (i32.gt_s
          (i32.sub
           (i32.add
            (i32.load8_u
             (i32.add
              (i32.or
               (get_local $5)
               (i32.const 1)
              )
              (i32.const 150832)
             )
            )
            (get_local $7)
           )
           (tee_local $7
            (i32.load8_u
             (tee_local $5
              (i32.add
               (i32.or
                (get_local $5)
                (i32.const 2)
               )
               (i32.const 150832)
              )
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (i32.store8
         (i32.add
          (get_local $1)
          (get_local $0)
         )
         (i32.const 0)
        )
        (br_if $label$0
         (i32.lt_s
          (tee_local $0
           (i32.shr_s
            (i32.add
             (i32.shl
              (get_local $6)
              (i32.const 24)
             )
             (i32.const -16777216)
            )
            (i32.const 24)
           )
          )
          (i32.const 0)
         )
        )
        (i32.store8
         (i32.add
          (i32.mul
           (get_local $0)
           (i32.const 12)
          )
          (i32.const 150832)
         )
         (i32.const 1)
        )
        (set_local $5
         (get_local $0)
        )
        (br $label$13)
       )
       (br_if $label$15
        (i32.ne
         (tee_local $0
          (i32.load8_u
           (tee_local $7
            (i32.add
             (i32.or
              (get_local $5)
              (i32.const 2)
             )
             (i32.const 150832)
            )
           )
          )
         )
         (i32.load8_u
          (i32.add
           (i32.or
            (get_local $5)
            (i32.const 1)
           )
           (i32.const 150832)
          )
         )
        )
       )
       (set_local $5
        (i32.add
         (get_local $6)
         (i32.const -1)
        )
       )
       (br $label$14)
      )
      (set_local $7
       (call $_Z16getFreeFourPointhPct
        (get_local $0)
        (get_local $1)
        (i32.load16_u
         (i32.add
          (i32.add
           (get_local $4)
           (i32.shl
            (get_local $7)
            (i32.const 1)
           )
          )
          (i32.const 4)
         )
        )
       )
      )
      (i32.store8
       (get_local $5)
       (i32.add
        (i32.load8_u
         (get_local $5)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (i32.add
        (tee_local $0
         (i32.mul
          (i32.shr_s
           (i32.shl
            (tee_local $5
             (i32.add
              (get_local $6)
              (i32.const 1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
          (i32.const 12)
         )
        )
        (i32.const 150832)
       )
       (i32.const 0)
      )
      (i32.store8
       (i32.add
        (i32.or
         (get_local $0)
         (i32.const 1)
        )
        (i32.const 150832)
       )
       (get_local $7)
      )
      (i32.store8
       (i32.add
        (get_local $0)
        (i32.const 150836)
       )
       (i32.shr_u
        (get_local $7)
        (i32.const 8)
       )
      )
      (i32.store8
       (i32.add
        (get_local $0)
        (i32.const 150837)
       )
       (i32.shr_u
        (get_local $7)
        (i32.const 16)
       )
      )
      (i32.store8
       (i32.add
        (i32.or
         (get_local $0)
         (i32.const 2)
        )
        (i32.const 150832)
       )
       (i32.const 0)
      )
      (br $label$14)
     )
     (i32.store8
      (get_local $7)
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (i32.store8
      (tee_local $4
       (i32.add
        (get_local $1)
        (tee_local $7
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $5)
            (get_local $0)
           )
           (i32.const 150836)
          )
         )
        )
       )
      )
      (i32.const 1)
     )
     (i32.store8
      (i32.add
       (tee_local $0
        (i32.mul
         (i32.shr_s
          (i32.shl
           (tee_local $5
            (i32.add
             (get_local $6)
             (i32.const 1)
            )
           )
           (i32.const 24)
          )
          (i32.const 24)
         )
         (i32.const 12)
        )
       )
       (i32.const 150832)
      )
      (i32.const 0)
     )
     (i32.store8
      (tee_local $12
       (i32.add
        (i32.or
         (get_local $0)
         (i32.const 1)
        )
        (i32.const 150832)
       )
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (i32.or
        (get_local $0)
        (i32.const 2)
       )
       (i32.const 150832)
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (i32.or
        (get_local $0)
        (i32.const 3)
       )
       (i32.const 150832)
      )
      (get_local $7)
     )
     (block $label$20
      (block $label$21
       (br_if $label$21
        (i32.eq
         (tee_local $8
          (i32.and
           (tee_local $10
            (call $_Z13testLineThreehhcPc
             (get_local $7)
             (i32.const 0)
             (i32.const 1)
             (get_local $1)
            )
           )
           (i32.const 31)
          )
         )
         (i32.const 10)
        )
       )
       (set_local $9
        (i32.add
         (get_local $0)
         (i32.const 150836)
        )
       )
       (block $label$22
        (block $label$23
         (block $label$24
          (br_if $label$24
           (i32.le_u
            (get_local $8)
            (i32.const 15)
           )
          )
          (set_local $8
           (i32.const 0)
          )
          (set_local $13
           (i32.const 1)
          )
          (br $label$23)
         )
         (block $label$25
          (br_if $label$25
           (i32.le_u
            (get_local $8)
            (i32.const 7)
           )
          )
          (set_local $8
           (i32.const 1)
          )
          (set_local $13
           (i32.const 0)
          )
          (br $label$23)
         )
         (set_local $13
          (i32.const 0)
         )
         (block $label$26
          (br_if $label$26
           (i32.ne
            (get_local $8)
            (i32.const 7)
           )
          )
          (set_local $11
           (i32.const 1)
          )
          (i32.store16
           (i32.add
            (get_local $9)
            (i32.shl
             (tee_local $0
              (i32.load8_u
               (get_local $12)
              )
             )
             (i32.const 1)
            )
           )
           (i32.and
            (get_local $10)
            (i32.const 36863)
           )
          )
          (i32.store8
           (get_local $12)
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
          (set_local $8
           (i32.const 0)
          )
          (br $label$22)
         )
         (set_local $8
          (i32.const 0)
         )
        )
        (set_local $11
         (i32.const 0)
        )
       )
       (br_if $label$21
        (i32.eq
         (tee_local $0
          (i32.and
           (tee_local $10
            (call $_Z13testLineThreehhcPc
             (get_local $7)
             (i32.const 1)
             (i32.const 1)
             (get_local $1)
            )
           )
           (i32.const 31)
          )
         )
         (i32.const 10)
        )
       )
       (block $label$27
        (block $label$28
         (br_if $label$28
          (i32.le_u
           (get_local $0)
           (i32.const 15)
          )
         )
         (set_local $13
          (i32.add
           (get_local $13)
           (i32.const 1)
          )
         )
         (br $label$27)
        )
        (block $label$29
         (br_if $label$29
          (i32.le_u
           (get_local $0)
           (i32.const 7)
          )
         )
         (set_local $8
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
         (br $label$27)
        )
        (br_if $label$27
         (i32.ne
          (get_local $0)
          (i32.const 7)
         )
        )
        (i32.store16
         (i32.add
          (get_local $9)
          (i32.shl
           (tee_local $0
            (i32.load8_u
             (get_local $12)
            )
           )
           (i32.const 1)
          )
         )
         (i32.or
          (i32.and
           (get_local $10)
           (i32.const 36863)
          )
          (i32.const 4096)
         )
        )
        (i32.store8
         (get_local $12)
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
        (set_local $11
         (i32.add
          (get_local $11)
          (i32.const 1)
         )
        )
       )
       (br_if $label$21
        (i32.eq
         (tee_local $0
          (i32.and
           (tee_local $10
            (call $_Z13testLineThreehhcPc
             (get_local $7)
             (i32.const 2)
             (i32.const 1)
             (get_local $1)
            )
           )
           (i32.const 31)
          )
         )
         (i32.const 10)
        )
       )
       (block $label$30
        (block $label$31
         (br_if $label$31
          (i32.le_u
           (get_local $0)
           (i32.const 15)
          )
         )
         (set_local $13
          (i32.add
           (get_local $13)
           (i32.const 1)
          )
         )
         (br $label$30)
        )
        (block $label$32
         (br_if $label$32
          (i32.le_u
           (get_local $0)
           (i32.const 7)
          )
         )
         (set_local $8
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
         (br $label$30)
        )
        (br_if $label$30
         (i32.ne
          (get_local $0)
          (i32.const 7)
         )
        )
        (i32.store16
         (i32.add
          (get_local $9)
          (i32.shl
           (tee_local $0
            (i32.load8_u
             (get_local $12)
            )
           )
           (i32.const 1)
          )
         )
         (i32.or
          (i32.and
           (get_local $10)
           (i32.const 36863)
          )
          (i32.const 8192)
         )
        )
        (i32.store8
         (get_local $12)
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
        (set_local $11
         (i32.add
          (get_local $11)
          (i32.const 1)
         )
        )
       )
       (br_if $label$21
        (i32.eq
         (tee_local $0
          (i32.and
           (tee_local $7
            (call $_Z13testLineThreehhcPc
             (get_local $7)
             (i32.const 3)
             (i32.const 1)
             (get_local $1)
            )
           )
           (i32.const 31)
          )
         )
         (i32.const 10)
        )
       )
       (br_if $label$21
        (i32.gt_u
         (get_local $0)
         (i32.const 15)
        )
       )
       (block $label$33
        (block $label$34
         (br_if $label$34
          (i32.le_u
           (get_local $0)
           (i32.const 7)
          )
         )
         (set_local $8
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
         (br_if $label$33
          (i32.eqz
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
         )
         (br $label$21)
        )
        (block $label$35
         (br_if $label$35
          (i32.ne
           (get_local $0)
           (i32.const 7)
          )
         )
         (i32.store16
          (i32.add
           (get_local $9)
           (i32.shl
            (tee_local $0
             (i32.load8_u
              (get_local $12)
             )
            )
            (i32.const 1)
           )
          )
          (i32.or
           (i32.and
            (get_local $7)
            (i32.const 36863)
           )
           (i32.const 12288)
          )
         )
         (i32.store8
          (get_local $12)
          (i32.add
           (get_local $0)
           (i32.const 1)
          )
         )
         (set_local $11
          (i32.add
           (get_local $11)
           (i32.const 1)
          )
         )
        )
        (br_if $label$21
         (i32.and
          (get_local $13)
          (i32.const 255)
         )
        )
       )
       (br_if $label$21
        (i32.gt_s
         (i32.shr_s
          (i32.shl
           (get_local $8)
           (i32.const 24)
          )
          (i32.const 24)
         )
         (i32.const 1)
        )
       )
       (br_if $label$14
        (i32.gt_s
         (i32.shr_s
          (i32.shl
           (get_local $11)
           (i32.const 24)
          )
          (i32.const 24)
         )
         (i32.const 1)
        )
       )
       (i32.store8
        (get_local $4)
        (i32.const 0)
       )
       (i32.store8
        (i32.add
         (i32.mul
          (i32.shr_s
           (i32.shl
            (get_local $6)
            (i32.const 24)
           )
           (i32.const 24)
          )
          (i32.const 12)
         )
         (i32.const 150832)
        )
        (i32.const 1)
       )
       (br $label$20)
      )
      (i32.store8
       (get_local $4)
       (i32.const 0)
      )
     )
     (set_local $5
      (get_local $6)
     )
    )
    (br_if $label$13
     (i32.gt_s
      (tee_local $0
       (i32.shr_s
        (i32.shl
         (get_local $5)
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (i32.const -1)
     )
    )
   )
  )
  (i32.store8
   (get_local $2)
   (get_local $3)
  )
  (i32.gt_u
   (i32.load8_u offset=150832
    (i32.const 0)
   )
   (i32.const 1)
  )
 )
 (func $_Z13testPointFourhcPc (; 34 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (set_local $4
   (i32.load8_u
    (tee_local $3
     (i32.add
      (get_local $2)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $3)
   (get_local $1)
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $5
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 0)
    (get_local $1)
    (get_local $2)
   )
  )
  (set_local $6
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 1)
    (get_local $1)
    (get_local $2)
   )
  )
  (set_local $7
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 2)
    (get_local $1)
    (get_local $2)
   )
  )
  (set_local $8
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 3)
    (get_local $1)
    (get_local $2)
   )
  )
  (i32.store8
   (get_local $3)
   (get_local $4)
  )
  (set_local $3
   (select
    (get_local $8)
    (select
     (get_local $7)
     (select
      (get_local $6)
      (select
       (get_local $5)
       (i32.const 0)
       (tee_local $3
        (i32.and
         (get_local $5)
         (i32.const 31)
        )
       )
      )
      (tee_local $4
       (i32.gt_u
        (tee_local $5
         (i32.and
          (get_local $6)
          (i32.const 31)
         )
        )
        (get_local $3)
       )
      )
     )
     (tee_local $5
      (i32.gt_u
       (tee_local $6
        (i32.and
         (get_local $7)
         (i32.const 31)
        )
       )
       (tee_local $3
        (select
         (get_local $5)
         (get_local $3)
         (get_local $4)
        )
       )
      )
     )
    )
    (i32.gt_u
     (i32.and
      (get_local $8)
      (i32.const 31)
     )
     (select
      (get_local $6)
      (get_local $3)
      (get_local $5)
     )
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.ne
     (get_local $1)
     (i32.const 1)
    )
   )
   (br_if $label$0
    (i32.ne
     (i32.and
      (i32.load8_u offset=32
       (i32.const 0)
      )
      (i32.const 255)
     )
     (i32.const 2)
    )
   )
   (set_local $9
    (i32.shl
     (call $_Z6isFoulhPc
      (get_local $0)
      (get_local $2)
     )
     (i32.const 4)
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $9)
    (get_local $3)
   )
   (i32.const 65535)
  )
 )
 (func $_Z8testFivePccPt (; 35 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 i32)
  (local $22 i32)
  (set_local $13
   (i32.const -2)
  )
  (set_local $19
   (get_local $2)
  )
  (loop $label$0
   (i32.store16
    (get_local $19)
    (i32.const 0)
   )
   (set_local $19
    (i32.add
     (get_local $19)
     (i32.const 4)
    )
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $13
      (i32.add
       (get_local $13)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $19
   (i32.add
    (get_local $2)
    (i32.const 2)
   )
  )
  (set_local $13
   (i32.const -1)
  )
  (loop $label$1
   (i32.store16
    (get_local $19)
    (i32.const 0)
   )
   (set_local $19
    (i32.add
     (get_local $19)
     (i32.const 4)
    )
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $13
      (i32.add
       (get_local $13)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $3
   (i32.const 0)
  )
  (loop $label$2
   (set_local $13
    (i32.const -2)
   )
   (set_local $19
    (i32.const 151328)
   )
   (loop $label$3
    (i32.store16
     (get_local $19)
     (i32.const 0)
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 4)
     )
    )
    (br_if $label$3
     (i32.lt_s
      (tee_local $13
       (i32.add
        (get_local $13)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $13
    (i32.const -1)
   )
   (set_local $19
    (i32.const 151330)
   )
   (loop $label$4
    (i32.store16
     (get_local $19)
     (i32.const 0)
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 4)
     )
    )
    (br_if $label$4
     (i32.lt_s
      (tee_local $13
       (i32.add
        (get_local $13)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $5
    (i32.and
     (tee_local $16
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $4
         (i32.load8_u offset=16
          (i32.const 0)
         )
        )
       )
       (i32.const 0)
       (i32.eq
        (get_local $3)
        (i32.const 2)
       )
      )
     )
     (i32.const 255)
    )
   )
   (block $label$5
    (block $label$6
     (br_if $label$6
      (tee_local $12
       (i32.gt_u
        (get_local $3)
        (i32.const 1)
       )
      )
     )
     (set_local $19
      (i32.add
       (get_local $5)
       (get_local $4)
      )
     )
     (br $label$5)
    )
    (set_local $19
     (i32.add
      (i32.add
       (i32.shl
        (get_local $4)
        (i32.const 1)
       )
       (get_local $5)
      )
      (i32.const -5)
     )
    )
   )
   (block $label$7
    (br_if $label$7
     (i32.le_u
      (tee_local $6
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
      )
      (get_local $5)
     )
    )
    (set_local $9
     (i32.shl
      (get_local $4)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.sub
      (i32.const 1)
      (get_local $5)
     )
    )
    (set_local $7
     (i32.mul
      (get_local $3)
      (i32.const 29)
     )
    )
    (set_local $19
     (get_local $5)
    )
    (loop $label$8
     (set_local $17
      (i32.const 14)
     )
     (block $label$9
      (br_if $label$9
       (i32.lt_u
        (get_local $3)
        (i32.const 3)
       )
      )
      (br_if $label$9
       (i32.lt_u
        (tee_local $13
         (i32.and
          (get_local $16)
          (i32.const 255)
         )
        )
        (get_local $4)
       )
      )
      (set_local $17
       (i32.sub
        (select
         (i32.add
          (get_local $19)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $13)
          (i32.const 15)
         )
        )
        (get_local $4)
       )
      )
     )
     (set_local $13
      (i32.and
       (get_local $17)
       (i32.const 255)
      )
     )
     (block $label$10
      (block $label$11
       (br_if $label$11
        (get_local $12)
       )
       (set_local $15
        (i32.add
         (get_local $13)
         (get_local $4)
        )
       )
       (br $label$10)
      )
      (block $label$12
       (br_if $label$12
        (i32.ge_s
         (tee_local $15
          (i32.sub
           (get_local $19)
           (get_local $5)
          )
         )
         (get_local $4)
        )
       )
       (set_local $15
        (i32.add
         (i32.add
          (get_local $8)
          (get_local $19)
         )
         (get_local $13)
        )
       )
       (br $label$10)
      )
      (set_local $15
       (i32.add
        (i32.add
         (get_local $13)
         (i32.xor
          (get_local $15)
          (i32.const -1)
         )
        )
        (get_local $9)
       )
      )
     )
     (block $label$13
      (br_if $label$13
       (i32.le_u
        (tee_local $10
         (i32.and
          (get_local $15)
          (i32.const 255)
         )
        )
        (get_local $13)
       )
      )
      (set_local $11
       (i32.mul
        (i32.add
         (get_local $19)
         (get_local $7)
        )
        (i32.const 43)
       )
      )
      (set_local $18
       (i32.const 0)
      )
      (set_local $22
       (i32.const 0)
      )
      (set_local $21
       (i32.const 0)
      )
      (set_local $20
       (i32.const 0)
      )
      (loop $label$14
       (block $label$15
        (block $label$16
         (br_if $label$16
          (i32.eqz
           (tee_local $19
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $15
               (i32.load8_u
                (i32.add
                 (tee_local $14
                  (i32.add
                   (get_local $13)
                   (get_local $11)
                  )
                 )
                 (i32.const 65600)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $20
          (select
           (i32.add
            (get_local $20)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $19
            (i32.eq
             (get_local $19)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $22
          (select
           (get_local $22)
           (get_local $18)
           (get_local $19)
          )
         )
         (set_local $21
          (select
           (get_local $21)
           (i32.const 0)
           (get_local $19)
          )
         )
         (br $label$15)
        )
        (i32.store8
         (i32.add
          (tee_local $19
           (i32.and
            (get_local $18)
            (i32.const 255)
           )
          )
          (i32.const 151296)
         )
         (get_local $15)
        )
        (i32.store8
         (i32.add
          (get_local $19)
          (i32.const 151312)
         )
         (get_local $17)
        )
        (set_local $18
         (i32.add
          (get_local $18)
          (i32.const 1)
         )
        )
        (set_local $21
         (i32.add
          (get_local $21)
          (i32.const 1)
         )
        )
       )
       (block $label$17
        (br_if $label$17
         (i32.ne
          (i32.add
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
           (tee_local $19
            (i32.and
             (get_local $20)
             (i32.const 255)
            )
           )
          )
          (i32.const 5)
         )
        )
        (block $label$18
         (br_if $label$18
          (i32.ne
           (get_local $19)
           (i32.const 4)
          )
         )
         (block $label$19
          (br_if $label$19
           (i32.ne
            (get_local $1)
            (i32.const 1)
           )
          )
          (br_if $label$19
           (i32.ne
            (i32.and
             (i32.load8_u offset=32
              (i32.const 0)
             )
             (i32.const 255)
            )
            (i32.const 2)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 65595)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$19
            (i32.ne
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 65601)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
          )
          (br_if $label$18
           (i32.ge_u
            (tee_local $19
             (i32.and
              (get_local $22)
              (i32.const 255)
             )
            )
            (tee_local $15
             (i32.and
              (get_local $18)
              (i32.const 255)
             )
            )
           )
          )
          (loop $label$21
           (i32.store16
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $19)
                (i32.const 151296)
               )
              )
              (i32.const 1)
             )
             (i32.const 151328)
            )
            (i32.or
             (i32.shl
              (i32.sub
               (get_local $13)
               (i32.load8_u
                (i32.add
                 (get_local $19)
                 (i32.const 151312)
                )
               )
              )
              (i32.const 5)
             )
             (i32.const 28)
            )
           )
           (br_if $label$21
            (i32.ne
             (get_local $15)
             (tee_local $19
              (i32.add
               (get_local $19)
               (i32.const 1)
              )
             )
            )
           )
           (br $label$18)
          )
         )
         (br_if $label$18
          (i32.ge_u
           (tee_local $19
            (i32.and
             (get_local $22)
             (i32.const 255)
            )
           )
           (tee_local $15
            (i32.and
             (get_local $18)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$22
          (i32.store16
           (i32.add
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $19)
               (i32.const 151296)
              )
             )
             (i32.const 1)
            )
            (i32.const 151328)
           )
           (i32.or
            (i32.shl
             (i32.sub
              (get_local $13)
              (i32.load8_u
               (i32.add
                (get_local $19)
                (i32.const 151312)
               )
              )
             )
             (i32.const 5)
            )
            (i32.const 10)
           )
          )
          (br_if $label$22
           (i32.ne
            (get_local $15)
            (tee_local $19
             (i32.add
              (get_local $19)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$23
         (br_if $label$23
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $14)
               (i32.const 65596)
              )
             )
            )
           )
          )
         )
         (set_local $20
          (i32.add
           (get_local $20)
           (i32.const -1)
          )
         )
         (br_if $label$17
          (i32.ge_u
           (tee_local $19
            (i32.and
             (get_local $22)
             (i32.const 255)
            )
           )
           (tee_local $15
            (i32.and
             (get_local $18)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$24
          (i32.store16
           (tee_local $13
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $19)
                (i32.const 151296)
               )
              )
              (i32.const 1)
             )
             (i32.const 151328)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $13)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$24
           (i32.ne
            (get_local $15)
            (tee_local $19
             (i32.add
              (get_local $19)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$17)
         )
        )
        (set_local $21
         (i32.add
          (get_local $21)
          (i32.const -1)
         )
        )
        (br_if $label$17
         (i32.ge_u
          (tee_local $19
           (i32.and
            (tee_local $22
             (i32.add
              (get_local $22)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $14
           (i32.and
            (get_local $18)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $19
         (i32.add
          (get_local $19)
          (i32.const 151296)
         )
        )
        (set_local $13
         (get_local $22)
        )
        (loop $label$25
         (i32.store16
          (tee_local $15
           (i32.add
            (i32.shl
             (i32.load8_u
              (get_local $19)
             )
             (i32.const 1)
            )
            (i32.const 151328)
           )
          )
          (i32.or
           (i32.load16_u
            (get_local $15)
           )
           (i32.const 32768)
          )
         )
         (set_local $19
          (i32.add
           (get_local $19)
           (i32.const 1)
          )
         )
         (br_if $label$25
          (i32.lt_u
           (i32.and
            (tee_local $13
             (i32.add
              (get_local $13)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $14)
          )
         )
        )
       )
       (br_if $label$14
        (i32.gt_u
         (get_local $10)
         (tee_local $13
          (i32.and
           (tee_local $17
            (i32.add
             (get_local $17)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$8
      (i32.gt_u
       (get_local $6)
       (tee_local $19
        (i32.and
         (tee_local $16
          (i32.add
           (get_local $16)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $15
    (i32.shl
     (get_local $3)
     (i32.const 12)
    )
   )
   (set_local $19
    (i32.const 0)
   )
   (loop $label$26
    (block $label$27
     (br_if $label$27
      (i32.ne
       (i32.and
        (tee_local $13
         (i32.load16_u
          (i32.add
           (get_local $19)
           (i32.const 151328)
          )
         )
        )
        (i32.const 14)
       )
       (i32.const 10)
      )
     )
     (i32.store16
      (i32.add
       (get_local $2)
       (get_local $19)
      )
      (i32.or
       (i32.and
        (get_local $13)
        (i32.const 36863)
       )
       (get_local $15)
      )
     )
    )
    (br_if $label$26
     (i32.ne
      (tee_local $19
       (i32.add
        (get_local $19)
        (i32.const 2)
       )
      )
      (i32.const 450)
     )
    )
   )
   (br_if $label$2
    (i32.ne
     (tee_local $3
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z8testFourPccPt (; 36 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 i32)
  (local $22 i32)
  (local $23 i32)
  (local $24 i32)
  (local $25 i32)
  (set_local $16
   (i32.const -2)
  )
  (set_local $22
   (get_local $2)
  )
  (loop $label$0
   (i32.store16
    (get_local $22)
    (i32.const 0)
   )
   (set_local $22
    (i32.add
     (get_local $22)
     (i32.const 4)
    )
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $16
      (i32.add
       (get_local $16)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $22
   (i32.add
    (get_local $2)
    (i32.const 2)
   )
  )
  (set_local $16
   (i32.const -1)
  )
  (loop $label$1
   (i32.store16
    (get_local $22)
    (i32.const 0)
   )
   (set_local $22
    (i32.add
     (get_local $22)
     (i32.const 4)
    )
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $16
      (i32.add
       (get_local $16)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $3
   (i32.const 0)
  )
  (loop $label$2
   (set_local $16
    (i32.const -2)
   )
   (set_local $22
    (i32.const 151328)
   )
   (loop $label$3
    (i32.store16
     (get_local $22)
     (i32.const 0)
    )
    (set_local $22
     (i32.add
      (get_local $22)
      (i32.const 4)
     )
    )
    (br_if $label$3
     (i32.lt_s
      (tee_local $16
       (i32.add
        (get_local $16)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $16
    (i32.const -1)
   )
   (set_local $22
    (i32.const 151330)
   )
   (loop $label$4
    (i32.store16
     (get_local $22)
     (i32.const 0)
    )
    (set_local $22
     (i32.add
      (get_local $22)
      (i32.const 4)
     )
    )
    (br_if $label$4
     (i32.lt_s
      (tee_local $16
       (i32.add
        (get_local $16)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $5
    (i32.and
     (tee_local $17
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $4
         (i32.load8_u offset=16
          (i32.const 0)
         )
        )
       )
       (i32.const 0)
       (i32.eq
        (get_local $3)
        (i32.const 2)
       )
      )
     )
     (i32.const 255)
    )
   )
   (block $label$5
    (block $label$6
     (br_if $label$6
      (tee_local $15
       (i32.gt_u
        (get_local $3)
        (i32.const 1)
       )
      )
     )
     (set_local $22
      (i32.add
       (get_local $5)
       (get_local $4)
      )
     )
     (br $label$5)
    )
    (set_local $22
     (i32.add
      (i32.add
       (i32.shl
        (get_local $4)
        (i32.const 1)
       )
       (get_local $5)
      )
      (i32.const -5)
     )
    )
   )
   (block $label$7
    (br_if $label$7
     (i32.le_u
      (tee_local $6
       (i32.and
        (get_local $22)
        (i32.const 255)
       )
      )
      (get_local $5)
     )
    )
    (set_local $9
     (i32.shl
      (get_local $4)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.sub
      (i32.const 1)
      (get_local $5)
     )
    )
    (set_local $7
     (i32.mul
      (get_local $3)
      (i32.const 29)
     )
    )
    (set_local $22
     (get_local $5)
    )
    (loop $label$8
     (set_local $19
      (i32.const 14)
     )
     (block $label$9
      (br_if $label$9
       (i32.lt_u
        (get_local $3)
        (i32.const 3)
       )
      )
      (br_if $label$9
       (i32.lt_u
        (tee_local $16
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (get_local $4)
       )
      )
      (set_local $19
       (i32.sub
        (select
         (i32.add
          (get_local $22)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $16)
          (i32.const 15)
         )
        )
        (get_local $4)
       )
      )
     )
     (set_local $18
      (i32.and
       (get_local $19)
       (i32.const 255)
      )
     )
     (block $label$10
      (block $label$11
       (br_if $label$11
        (get_local $15)
       )
       (set_local $16
        (i32.add
         (get_local $18)
         (get_local $4)
        )
       )
       (br $label$10)
      )
      (block $label$12
       (br_if $label$12
        (i32.ge_s
         (tee_local $16
          (i32.sub
           (get_local $22)
           (get_local $5)
          )
         )
         (get_local $4)
        )
       )
       (set_local $16
        (i32.add
         (i32.add
          (get_local $8)
          (get_local $22)
         )
         (get_local $18)
        )
       )
       (br $label$10)
      )
      (set_local $16
       (i32.add
        (i32.add
         (get_local $18)
         (i32.xor
          (get_local $16)
          (i32.const -1)
         )
        )
        (get_local $9)
       )
      )
     )
     (block $label$13
      (br_if $label$13
       (i32.le_u
        (tee_local $10
         (i32.and
          (get_local $16)
          (i32.const 255)
         )
        )
        (get_local $18)
       )
      )
      (set_local $11
       (i32.mul
        (i32.add
         (get_local $22)
         (get_local $7)
        )
        (i32.const 43)
       )
      )
      (set_local $20
       (i32.const 0)
      )
      (set_local $25
       (i32.const 0)
      )
      (set_local $24
       (i32.const 0)
      )
      (set_local $23
       (i32.const 0)
      )
      (loop $label$14
       (block $label$15
        (block $label$16
         (br_if $label$16
          (i32.eqz
           (tee_local $22
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $16
               (i32.load8_u
                (i32.add
                 (tee_local $12
                  (i32.add
                   (get_local $18)
                   (get_local $11)
                  )
                 )
                 (i32.const 65600)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $23
          (select
           (i32.add
            (get_local $23)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $22
            (i32.eq
             (get_local $22)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $25
          (select
           (get_local $25)
           (get_local $20)
           (get_local $22)
          )
         )
         (set_local $24
          (select
           (get_local $24)
           (i32.const 0)
           (get_local $22)
          )
         )
         (br $label$15)
        )
        (i32.store8
         (i32.add
          (tee_local $22
           (i32.and
            (get_local $20)
            (i32.const 255)
           )
          )
          (i32.const 151296)
         )
         (get_local $16)
        )
        (i32.store8
         (i32.add
          (get_local $22)
          (i32.const 151312)
         )
         (get_local $19)
        )
        (set_local $20
         (i32.add
          (get_local $20)
          (i32.const 1)
         )
        )
        (set_local $24
         (i32.add
          (get_local $24)
          (i32.const 1)
         )
        )
       )
       (block $label$17
        (br_if $label$17
         (i32.ne
          (i32.add
           (i32.and
            (get_local $24)
            (i32.const 255)
           )
           (tee_local $22
            (i32.and
             (get_local $23)
             (i32.const 255)
            )
           )
          )
          (i32.const 5)
         )
        )
        (block $label$18
         (block $label$19
          (block $label$20
           (block $label$21
            (block $label$22
             (br_if $label$22
              (i32.eq
               (get_local $22)
               (i32.const 3)
              )
             )
             (br_if $label$18
              (i32.ne
               (get_local $22)
               (i32.const 4)
              )
             )
             (br_if $label$21
              (i32.ne
               (get_local $1)
               (i32.const 1)
              )
             )
             (br_if $label$21
              (i32.ne
               (i32.and
                (i32.load8_u offset=32
                 (i32.const 0)
                )
                (i32.const 255)
               )
               (i32.const 2)
              )
             )
             (block $label$23
              (br_if $label$23
               (i32.eq
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $12)
                    (i32.const 65595)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
              (br_if $label$21
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $12)
                    (i32.const 65601)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
             (br_if $label$18
              (i32.ge_u
               (tee_local $22
                (i32.and
                 (get_local $25)
                 (i32.const 255)
                )
               )
               (tee_local $16
                (i32.and
                 (get_local $20)
                 (i32.const 255)
                )
               )
              )
             )
             (loop $label$24
              (i32.store16
               (i32.add
                (i32.shl
                 (i32.load8_u
                  (i32.add
                   (get_local $22)
                   (i32.const 151296)
                  )
                 )
                 (i32.const 1)
                )
                (i32.const 151328)
               )
               (i32.or
                (i32.shl
                 (i32.sub
                  (get_local $18)
                  (i32.load8_u
                   (i32.add
                    (get_local $22)
                    (i32.const 151312)
                   )
                  )
                 )
                 (i32.const 5)
                )
                (i32.const 28)
               )
              )
              (br_if $label$24
               (i32.ne
                (get_local $16)
                (tee_local $22
                 (i32.add
                  (get_local $22)
                  (i32.const 1)
                 )
                )
               )
              )
              (br $label$18)
             )
            )
            (br_if $label$20
             (i32.ne
              (get_local $1)
              (i32.const 1)
             )
            )
            (br_if $label$20
             (i32.ne
              (i32.and
               (i32.load8_u offset=32
                (i32.const 0)
               )
               (i32.const 255)
              )
              (i32.const 2)
             )
            )
            (br_if $label$18
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $12)
                  (i32.const 65595)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$18
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $12)
                  (i32.const 65601)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$19
             (i32.lt_u
              (i32.and
               (get_local $25)
               (i32.const 255)
              )
              (i32.and
               (get_local $20)
               (i32.const 255)
              )
             )
            )
            (br $label$18)
           )
           (br_if $label$18
            (i32.ge_u
             (tee_local $22
              (i32.and
               (get_local $25)
               (i32.const 255)
              )
             )
             (tee_local $16
              (i32.and
               (get_local $20)
               (i32.const 255)
              )
             )
            )
           )
           (loop $label$25
            (i32.store16
             (i32.add
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $22)
                 (i32.const 151296)
                )
               )
               (i32.const 1)
              )
              (i32.const 151328)
             )
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $18)
                (i32.load8_u
                 (i32.add
                  (get_local $22)
                  (i32.const 151312)
                 )
                )
               )
               (i32.const 5)
              )
              (i32.const 10)
             )
            )
            (br_if $label$25
             (i32.ne
              (get_local $16)
              (tee_local $22
               (i32.add
                (get_local $22)
                (i32.const 1)
               )
              )
             )
            )
            (br $label$18)
           )
          )
          (br_if $label$18
           (i32.ge_u
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
            (i32.and
             (get_local $20)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $13
          (i32.and
           (get_local $20)
           (i32.const 255)
          )
         )
         (set_local $16
          (i32.and
           (get_local $25)
           (i32.const 255)
          )
         )
         (loop $label$26
          (block $label$27
           (br_if $label$27
            (i32.gt_u
             (i32.and
              (tee_local $22
               (i32.load16_u
                (tee_local $14
                 (i32.add
                  (i32.shl
                   (i32.load8_u
                    (i32.add
                     (get_local $16)
                     (i32.const 151296)
                    )
                   )
                   (i32.const 1)
                  )
                  (i32.const 151328)
                 )
                )
               )
              )
              (i32.const 8)
             )
             (i32.const 7)
            )
           )
           (i32.store16
            (get_local $14)
            (tee_local $22
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $18)
                (i32.load8_u
                 (i32.add
                  (get_local $16)
                  (i32.const 151312)
                 )
                )
               )
               (i32.const 5)
              )
              (i32.const 32776)
             )
            )
           )
          )
          (block $label$28
           (br_if $label$28
            (i32.ne
             (i32.and
              (get_local $22)
              (i32.const 14)
             )
             (i32.const 8)
            )
           )
           (block $label$29
            (br_if $label$29
             (i32.eqz
              (i32.and
               (tee_local $21
                (i32.and
                 (get_local $22)
                 (i32.const 65535)
                )
               )
               (i32.const 32768)
              )
             )
            )
            (i32.store16
             (get_local $14)
             (tee_local $22
              (i32.add
               (get_local $21)
               (i32.const 4096)
              )
             )
            )
           )
           (i32.store16
            (get_local $14)
            (tee_local $21
             (i32.and
              (get_local $22)
              (i32.const 32767)
             )
            )
           )
           (block $label$30
            (br_if $label$30
             (i32.eqz
              (i32.and
               (get_local $22)
               (i32.const 2048)
              )
             )
            )
            (i32.store16
             (get_local $14)
             (tee_local $21
              (i32.or
               (i32.shl
                (i32.sub
                 (get_local $18)
                 (i32.load8_u
                  (i32.add
                   (get_local $16)
                   (i32.const 151312)
                  )
                 )
                )
                (i32.const 5)
               )
               (i32.and
                (i32.add
                 (get_local $21)
                 (i32.const 256)
                )
                (i32.const 65311)
               )
              )
             )
            )
           )
           (i32.store16
            (get_local $14)
            (i32.or
             (get_local $21)
             (i32.const 2048)
            )
           )
          )
          (br_if $label$26
           (i32.ne
            (get_local $13)
            (tee_local $16
             (i32.add
              (get_local $16)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$31
         (br_if $label$31
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $12)
               (i32.const 65596)
              )
             )
            )
           )
          )
         )
         (set_local $23
          (i32.add
           (get_local $23)
           (i32.const -1)
          )
         )
         (br_if $label$17
          (i32.ge_u
           (tee_local $22
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
           )
           (tee_local $18
            (i32.and
             (get_local $20)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$32
          (i32.store16
           (tee_local $16
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $22)
                (i32.const 151296)
               )
              )
              (i32.const 1)
             )
             (i32.const 151328)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $16)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$32
           (i32.ne
            (get_local $18)
            (tee_local $22
             (i32.add
              (get_local $22)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$17)
         )
        )
        (set_local $24
         (i32.add
          (get_local $24)
          (i32.const -1)
         )
        )
        (br_if $label$17
         (i32.ge_u
          (tee_local $22
           (i32.and
            (tee_local $25
             (i32.add
              (get_local $25)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $14
           (i32.and
            (get_local $20)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $22
         (i32.add
          (get_local $22)
          (i32.const 151296)
         )
        )
        (set_local $16
         (get_local $25)
        )
        (loop $label$33
         (i32.store16
          (tee_local $18
           (i32.add
            (i32.shl
             (i32.load8_u
              (get_local $22)
             )
             (i32.const 1)
            )
            (i32.const 151328)
           )
          )
          (i32.or
           (i32.load16_u
            (get_local $18)
           )
           (i32.const 32768)
          )
         )
         (set_local $22
          (i32.add
           (get_local $22)
           (i32.const 1)
          )
         )
         (br_if $label$33
          (i32.lt_u
           (i32.and
            (tee_local $16
             (i32.add
              (get_local $16)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $14)
          )
         )
        )
       )
       (br_if $label$14
        (i32.gt_u
         (get_local $10)
         (tee_local $18
          (i32.and
           (tee_local $19
            (i32.add
             (get_local $19)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$8
      (i32.gt_u
       (get_local $6)
       (tee_local $22
        (i32.and
         (tee_local $17
          (i32.add
           (get_local $17)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $21
    (i32.shl
     (get_local $3)
     (i32.const 12)
    )
   )
   (block $label$34
    (block $label$35
     (br_if $label$35
      (i32.ne
       (get_local $1)
       (i32.const 1)
      )
     )
     (set_local $22
      (i32.const 0)
     )
     (set_local $16
      (i32.const 0)
     )
     (loop $label$36
      (block $label$37
       (block $label$38
        (br_if $label$38
         (i32.eq
          (tee_local $14
           (i32.and
            (tee_local $18
             (i32.load16_u
              (tee_local $24
               (i32.add
                (get_local $22)
                (i32.const 151328)
               )
              )
             )
            )
            (i32.const 14)
           )
          )
          (i32.const 10)
         )
        )
        (br_if $label$37
         (i32.ne
          (get_local $14)
          (i32.const 8)
         )
        )
        (i32.store16
         (get_local $24)
         (tee_local $18
          (i32.or
           (i32.ne
            (i32.and
             (get_local $18)
             (i32.const 1792)
            )
            (i32.const 0)
           )
           (get_local $18)
          )
         )
        )
        (br_if $label$37
         (i32.le_u
          (i32.and
           (get_local $18)
           (i32.const 31)
          )
          (i32.and
           (i32.load16_u
            (tee_local $14
             (i32.add
              (get_local $2)
              (get_local $22)
             )
            )
           )
           (i32.const 31)
          )
         )
        )
        (block $label$39
         (br_if $label$39
          (i32.eq
           (i32.load8_u offset=32
            (i32.const 0)
           )
           (i32.const 2)
          )
         )
         (i32.store16
          (get_local $14)
          (i32.or
           (i32.and
            (get_local $18)
            (i32.const 36863)
           )
           (get_local $21)
          )
         )
         (br $label$37)
        )
        (i32.store16
         (get_local $14)
         (i32.or
          (i32.or
           (i32.shl
            (call $_Z6isFoulhPc
             (i32.and
              (get_local $16)
              (i32.const 255)
             )
             (get_local $0)
            )
            (i32.const 4)
           )
           (get_local $21)
          )
          (i32.and
           (i32.load16_u
            (get_local $24)
           )
           (i32.const 36863)
          )
         )
        )
        (br $label$37)
       )
       (i32.store16
        (i32.add
         (get_local $2)
         (get_local $22)
        )
        (i32.or
         (i32.and
          (get_local $18)
          (i32.const 36863)
         )
         (get_local $21)
        )
       )
      )
      (set_local $22
       (i32.add
        (get_local $22)
        (i32.const 2)
       )
      )
      (br_if $label$36
       (i32.ne
        (tee_local $16
         (i32.add
          (get_local $16)
          (i32.const 1)
         )
        )
        (i32.const 225)
       )
      )
      (br $label$34)
     )
    )
    (set_local $22
     (i32.const 0)
    )
    (loop $label$40
     (block $label$41
      (block $label$42
       (br_if $label$42
        (i32.eq
         (tee_local $18
          (i32.and
           (tee_local $16
            (i32.load16_u
             (tee_local $14
              (i32.add
               (get_local $22)
               (i32.const 151328)
              )
             )
            )
           )
           (i32.const 14)
          )
         )
         (i32.const 8)
        )
       )
       (br_if $label$41
        (i32.ne
         (get_local $18)
         (i32.const 10)
        )
       )
       (i32.store16
        (i32.add
         (get_local $2)
         (get_local $22)
        )
        (i32.or
         (i32.and
          (get_local $16)
          (i32.const 36863)
         )
         (get_local $21)
        )
       )
       (br $label$41)
      )
      (i32.store16
       (get_local $14)
       (tee_local $16
        (i32.or
         (i32.ne
          (i32.and
           (get_local $16)
           (i32.const 1792)
          )
          (i32.const 0)
         )
         (get_local $16)
        )
       )
      )
      (br_if $label$41
       (i32.le_u
        (i32.and
         (get_local $16)
         (i32.const 31)
        )
        (i32.and
         (i32.load16_u
          (tee_local $18
           (i32.add
            (get_local $2)
            (get_local $22)
           )
          )
         )
         (i32.const 31)
        )
       )
      )
      (i32.store16
       (get_local $18)
       (i32.or
        (i32.and
         (get_local $16)
         (i32.const 36863)
        )
        (get_local $21)
       )
      )
     )
     (br_if $label$40
      (i32.ne
       (tee_local $22
        (i32.add
         (get_local $22)
         (i32.const 2)
        )
       )
       (i32.const 450)
      )
     )
    )
   )
   (br_if $label$2
    (i32.ne
     (tee_local $3
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z9testThreePccPt (; 37 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 i32)
  (local $22 i32)
  (local $23 i32)
  (local $24 i32)
  (local $25 i32)
  (local $26 i32)
  (local $27 i32)
  (local $28 i32)
  (set_local $20
   (i32.const -2)
  )
  (set_local $25
   (get_local $2)
  )
  (loop $label$0
   (i32.store16
    (get_local $25)
    (i32.const 0)
   )
   (set_local $25
    (i32.add
     (get_local $25)
     (i32.const 4)
    )
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $20
      (i32.add
       (get_local $20)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $25
   (i32.add
    (get_local $2)
    (i32.const 2)
   )
  )
  (set_local $20
   (i32.const -1)
  )
  (loop $label$1
   (i32.store16
    (get_local $25)
    (i32.const 0)
   )
   (set_local $25
    (i32.add
     (get_local $25)
     (i32.const 4)
    )
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $20
      (i32.add
       (get_local $20)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $3
   (i32.const 0)
  )
  (loop $label$2
   (set_local $20
    (i32.const -2)
   )
   (set_local $25
    (i32.const 151328)
   )
   (loop $label$3
    (i32.store16
     (get_local $25)
     (i32.const 0)
    )
    (set_local $25
     (i32.add
      (get_local $25)
      (i32.const 4)
     )
    )
    (br_if $label$3
     (i32.lt_s
      (tee_local $20
       (i32.add
        (get_local $20)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $20
    (i32.const -1)
   )
   (set_local $25
    (i32.const 151330)
   )
   (loop $label$4
    (i32.store16
     (get_local $25)
     (i32.const 0)
    )
    (set_local $25
     (i32.add
      (get_local $25)
      (i32.const 4)
     )
    )
    (br_if $label$4
     (i32.lt_s
      (tee_local $20
       (i32.add
        (get_local $20)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $5
    (i32.and
     (tee_local $22
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $4
         (i32.load8_u offset=16
          (i32.const 0)
         )
        )
       )
       (i32.const 0)
       (i32.eq
        (get_local $3)
        (i32.const 2)
       )
      )
     )
     (i32.const 255)
    )
   )
   (block $label$5
    (block $label$6
     (br_if $label$6
      (tee_local $19
       (i32.gt_u
        (get_local $3)
        (i32.const 1)
       )
      )
     )
     (set_local $25
      (i32.add
       (get_local $5)
       (get_local $4)
      )
     )
     (br $label$5)
    )
    (set_local $25
     (i32.add
      (i32.add
       (i32.shl
        (get_local $4)
        (i32.const 1)
       )
       (get_local $5)
      )
      (i32.const -5)
     )
    )
   )
   (block $label$7
    (br_if $label$7
     (i32.le_u
      (tee_local $6
       (i32.and
        (get_local $25)
        (i32.const 255)
       )
      )
      (get_local $5)
     )
    )
    (set_local $9
     (i32.shl
      (get_local $4)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.sub
      (i32.const 1)
      (get_local $5)
     )
    )
    (set_local $7
     (i32.mul
      (get_local $3)
      (i32.const 29)
     )
    )
    (set_local $25
     (get_local $5)
    )
    (loop $label$8
     (set_local $23
      (i32.const 14)
     )
     (block $label$9
      (br_if $label$9
       (i32.lt_u
        (get_local $3)
        (i32.const 3)
       )
      )
      (br_if $label$9
       (i32.lt_u
        (tee_local $20
         (i32.and
          (get_local $22)
          (i32.const 255)
         )
        )
        (get_local $4)
       )
      )
      (set_local $23
       (i32.sub
        (select
         (i32.add
          (get_local $25)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $20)
          (i32.const 15)
         )
        )
        (get_local $4)
       )
      )
     )
     (set_local $20
      (i32.and
       (get_local $23)
       (i32.const 255)
      )
     )
     (block $label$10
      (block $label$11
       (br_if $label$11
        (get_local $19)
       )
       (set_local $21
        (i32.add
         (get_local $20)
         (get_local $4)
        )
       )
       (br $label$10)
      )
      (block $label$12
       (br_if $label$12
        (i32.ge_s
         (tee_local $21
          (i32.sub
           (get_local $25)
           (get_local $5)
          )
         )
         (get_local $4)
        )
       )
       (set_local $21
        (i32.add
         (i32.add
          (get_local $8)
          (get_local $25)
         )
         (get_local $20)
        )
       )
       (br $label$10)
      )
      (set_local $21
       (i32.add
        (i32.add
         (get_local $20)
         (i32.xor
          (get_local $21)
          (i32.const -1)
         )
        )
        (get_local $9)
       )
      )
     )
     (block $label$13
      (br_if $label$13
       (i32.le_u
        (tee_local $10
         (i32.and
          (get_local $21)
          (i32.const 255)
         )
        )
        (get_local $20)
       )
      )
      (set_local $11
       (i32.mul
        (i32.add
         (get_local $25)
         (get_local $7)
        )
        (i32.const 43)
       )
      )
      (set_local $28
       (i32.const 0)
      )
      (set_local $24
       (i32.const 0)
      )
      (set_local $27
       (i32.const 0)
      )
      (set_local $26
       (i32.const 0)
      )
      (loop $label$14
       (block $label$15
        (block $label$16
         (br_if $label$16
          (i32.eqz
           (tee_local $25
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $21
               (i32.load8_u
                (i32.add
                 (tee_local $12
                  (i32.add
                   (get_local $20)
                   (get_local $11)
                  )
                 )
                 (i32.const 65600)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $26
          (select
           (i32.add
            (get_local $26)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $25
            (i32.eq
             (get_local $25)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $28
          (select
           (get_local $28)
           (i32.const 0)
           (get_local $25)
          )
         )
         (set_local $27
          (select
           (get_local $27)
           (get_local $24)
           (get_local $25)
          )
         )
         (br $label$15)
        )
        (i32.store8
         (i32.add
          (tee_local $25
           (i32.and
            (get_local $24)
            (i32.const 255)
           )
          )
          (i32.const 151296)
         )
         (get_local $21)
        )
        (i32.store8
         (i32.add
          (get_local $25)
          (i32.const 151312)
         )
         (get_local $23)
        )
        (set_local $24
         (i32.add
          (get_local $24)
          (i32.const 1)
         )
        )
        (set_local $28
         (i32.add
          (get_local $28)
          (i32.const 1)
         )
        )
       )
       (block $label$17
        (br_if $label$17
         (i32.ne
          (i32.add
           (i32.and
            (get_local $28)
            (i32.const 255)
           )
           (tee_local $13
            (i32.and
             (get_local $26)
             (i32.const 255)
            )
           )
          )
          (i32.const 5)
         )
        )
        (block $label$18
         (block $label$19
          (block $label$20
           (block $label$21
            (block $label$22
             (br_if $label$22
              (i32.ne
               (get_local $13)
               (i32.const 4)
              )
             )
             (br_if $label$21
              (i32.ne
               (get_local $1)
               (i32.const 1)
              )
             )
             (br_if $label$21
              (i32.ne
               (i32.and
                (i32.load8_u offset=32
                 (i32.const 0)
                )
                (i32.const 255)
               )
               (i32.const 2)
              )
             )
             (block $label$23
              (br_if $label$23
               (i32.eq
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $12)
                    (i32.const 65595)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
              (br_if $label$21
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $12)
                    (i32.const 65601)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
             (br_if $label$18
              (i32.ge_u
               (tee_local $25
                (i32.and
                 (get_local $27)
                 (i32.const 255)
                )
               )
               (tee_local $21
                (i32.and
                 (get_local $24)
                 (i32.const 255)
                )
               )
              )
             )
             (loop $label$24
              (i32.store16
               (i32.add
                (i32.shl
                 (i32.load8_u
                  (i32.add
                   (get_local $25)
                   (i32.const 151296)
                  )
                 )
                 (i32.const 1)
                )
                (i32.const 151328)
               )
               (i32.or
                (i32.shl
                 (i32.sub
                  (get_local $20)
                  (i32.load8_u
                   (i32.add
                    (get_local $25)
                    (i32.const 151312)
                   )
                  )
                 )
                 (i32.const 5)
                )
                (i32.const 28)
               )
              )
              (br_if $label$24
               (i32.ne
                (get_local $21)
                (tee_local $25
                 (i32.add
                  (get_local $25)
                  (i32.const 1)
                 )
                )
               )
              )
              (br $label$18)
             )
            )
            (br_if $label$18
             (i32.ne
              (i32.and
               (get_local $26)
               (i32.const 254)
              )
              (i32.const 2)
             )
            )
            (br_if $label$20
             (i32.ne
              (get_local $1)
              (i32.const 1)
             )
            )
            (br_if $label$20
             (i32.ne
              (i32.and
               (i32.load8_u offset=32
                (i32.const 0)
               )
               (i32.const 255)
              )
              (i32.const 2)
             )
            )
            (br_if $label$18
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $12)
                  (i32.const 65595)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$18
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $12)
                  (i32.const 65601)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$19
             (i32.lt_u
              (i32.and
               (get_local $27)
               (i32.const 255)
              )
              (i32.and
               (get_local $24)
               (i32.const 255)
              )
             )
            )
            (br $label$18)
           )
           (br_if $label$18
            (i32.ge_u
             (tee_local $25
              (i32.and
               (get_local $27)
               (i32.const 255)
              )
             )
             (tee_local $21
              (i32.and
               (get_local $24)
               (i32.const 255)
              )
             )
            )
           )
           (loop $label$25
            (i32.store16
             (i32.add
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $25)
                 (i32.const 151296)
                )
               )
               (i32.const 1)
              )
              (i32.const 151328)
             )
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $20)
                (i32.load8_u
                 (i32.add
                  (get_local $25)
                  (i32.const 151312)
                 )
                )
               )
               (i32.const 5)
              )
              (i32.const 10)
             )
            )
            (br_if $label$25
             (i32.ne
              (get_local $21)
              (tee_local $25
               (i32.add
                (get_local $25)
                (i32.const 1)
               )
              )
             )
            )
            (br $label$18)
           )
          )
          (br_if $label$18
           (i32.ge_u
            (i32.and
             (get_local $27)
             (i32.const 255)
            )
            (i32.and
             (get_local $24)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $16
          (i32.and
           (get_local $24)
           (i32.const 255)
          )
         )
         (set_local $25
          (i32.and
           (get_local $27)
           (i32.const 255)
          )
         )
         (set_local $15
          (i32.shl
           (tee_local $14
            (i32.add
             (get_local $13)
             (i32.const 1)
            )
           )
           (i32.const 1)
          )
         )
         (loop $label$26
          (block $label$27
           (br_if $label$27
            (i32.gt_u
             (i32.shr_u
              (i32.and
               (tee_local $21
                (i32.load16_u
                 (tee_local $17
                  (i32.add
                   (i32.shl
                    (i32.load8_u
                     (i32.add
                      (get_local $25)
                      (i32.const 151296)
                     )
                    )
                    (i32.const 1)
                   )
                   (i32.const 151328)
                  )
                 )
                )
               )
               (i32.const 14)
              )
              (i32.const 1)
             )
             (get_local $13)
            )
           )
           (i32.store16
            (get_local $17)
            (tee_local $21
             (i32.or
              (i32.or
               (get_local $15)
               (i32.shl
                (i32.sub
                 (get_local $20)
                 (i32.load8_u
                  (i32.add
                   (get_local $25)
                   (i32.const 151312)
                  )
                 )
                )
                (i32.const 5)
               )
              )
              (i32.const 32768)
             )
            )
           )
          )
          (block $label$28
           (br_if $label$28
            (i32.ne
             (i32.and
              (i32.shr_u
               (tee_local $18
                (i32.and
                 (get_local $21)
                 (i32.const 65535)
                )
               )
               (i32.const 1)
              )
              (i32.const 7)
             )
             (get_local $14)
            )
           )
           (block $label$29
            (br_if $label$29
             (i32.eqz
              (i32.and
               (get_local $18)
               (i32.const 32768)
              )
             )
            )
            (i32.store16
             (get_local $17)
             (tee_local $21
              (i32.add
               (get_local $18)
               (i32.const 4096)
              )
             )
            )
           )
           (i32.store16
            (get_local $17)
            (tee_local $18
             (i32.and
              (get_local $21)
              (i32.const 32767)
             )
            )
           )
           (block $label$30
            (br_if $label$30
             (i32.eqz
              (i32.and
               (get_local $21)
               (i32.const 2048)
              )
             )
            )
            (i32.store16
             (get_local $17)
             (tee_local $18
              (i32.or
               (i32.shl
                (i32.sub
                 (get_local $20)
                 (i32.load8_u
                  (i32.add
                   (get_local $25)
                   (i32.const 151312)
                  )
                 )
                )
                (i32.const 5)
               )
               (i32.and
                (i32.add
                 (get_local $18)
                 (i32.const 256)
                )
                (i32.const 65311)
               )
              )
             )
            )
           )
           (i32.store16
            (get_local $17)
            (i32.or
             (get_local $18)
             (i32.const 2048)
            )
           )
          )
          (br_if $label$26
           (i32.ne
            (get_local $16)
            (tee_local $25
             (i32.add
              (get_local $25)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$31
         (br_if $label$31
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $12)
               (i32.const 65596)
              )
             )
            )
           )
          )
         )
         (set_local $26
          (i32.add
           (get_local $26)
           (i32.const -1)
          )
         )
         (br_if $label$17
          (i32.ge_u
           (tee_local $25
            (i32.and
             (get_local $27)
             (i32.const 255)
            )
           )
           (tee_local $21
            (i32.and
             (get_local $24)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$32
          (i32.store16
           (tee_local $20
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $25)
                (i32.const 151296)
               )
              )
              (i32.const 1)
             )
             (i32.const 151328)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $20)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$32
           (i32.ne
            (get_local $21)
            (tee_local $25
             (i32.add
              (get_local $25)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$17)
         )
        )
        (set_local $28
         (i32.add
          (get_local $28)
          (i32.const -1)
         )
        )
        (br_if $label$17
         (i32.ge_u
          (tee_local $25
           (i32.and
            (tee_local $27
             (i32.add
              (get_local $27)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $17
           (i32.and
            (get_local $24)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $25
         (i32.add
          (get_local $25)
          (i32.const 151296)
         )
        )
        (set_local $20
         (get_local $27)
        )
        (loop $label$33
         (i32.store16
          (tee_local $21
           (i32.add
            (i32.shl
             (i32.load8_u
              (get_local $25)
             )
             (i32.const 1)
            )
            (i32.const 151328)
           )
          )
          (i32.or
           (i32.load16_u
            (get_local $21)
           )
           (i32.const 32768)
          )
         )
         (set_local $25
          (i32.add
           (get_local $25)
           (i32.const 1)
          )
         )
         (br_if $label$33
          (i32.lt_u
           (i32.and
            (tee_local $20
             (i32.add
              (get_local $20)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $17)
          )
         )
        )
       )
       (br_if $label$14
        (i32.gt_u
         (get_local $10)
         (tee_local $20
          (i32.and
           (tee_local $23
            (i32.add
             (get_local $23)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$8
      (i32.gt_u
       (get_local $6)
       (tee_local $25
        (i32.and
         (tee_local $22
          (i32.add
           (get_local $22)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $26
    (i32.shl
     (get_local $3)
     (i32.const 12)
    )
   )
   (block $label$34
    (block $label$35
     (br_if $label$35
      (i32.ne
       (get_local $1)
       (i32.const 1)
      )
     )
     (set_local $25
      (i32.const 0)
     )
     (loop $label$36
      (block $label$37
       (block $label$38
        (br_if $label$38
         (i32.ne
          (tee_local $17
           (i32.and
            (i32.shr_u
             (tee_local $20
              (i32.load16_u
               (tee_local $28
                (i32.add
                 (tee_local $21
                  (i32.shl
                   (get_local $25)
                   (i32.const 1)
                  )
                 )
                 (i32.const 151328)
                )
               )
              )
             )
             (i32.const 1)
            )
            (i32.const 7)
           )
          )
          (i32.const 5)
         )
        )
        (i32.store16
         (i32.add
          (get_local $2)
          (get_local $21)
         )
         (i32.or
          (i32.and
           (get_local $20)
           (i32.const 36863)
          )
          (get_local $26)
         )
        )
        (br $label$37)
       )
       (br_if $label$37
        (i32.gt_u
         (i32.add
          (get_local $17)
          (i32.const -3)
         )
         (i32.const 1)
        )
       )
       (i32.store16
        (get_local $28)
        (tee_local $20
         (i32.or
          (i32.ne
           (i32.and
            (get_local $20)
            (i32.const 1792)
           )
           (i32.const 0)
          )
          (get_local $20)
         )
        )
       )
       (br_if $label$37
        (i32.le_u
         (i32.and
          (get_local $20)
          (i32.const 31)
         )
         (i32.and
          (i32.load16_u
           (tee_local $21
            (i32.add
             (get_local $2)
             (get_local $21)
            )
           )
          )
          (i32.const 31)
         )
        )
       )
       (block $label$39
        (br_if $label$39
         (i32.ne
          (i32.load8_u offset=32
           (i32.const 0)
          )
          (i32.const 2)
         )
        )
        (set_local $13
         (call $_Z6isFoulhPc
          (tee_local $20
           (i32.and
            (get_local $25)
            (i32.const 255)
           )
          )
          (get_local $0)
         )
        )
        (block $label$40
         (br_if $label$40
          (i32.ne
           (get_local $17)
           (i32.const 3)
          )
         )
         (br_if $label$40
          (i32.or
           (get_local $13)
           (i32.eqz
            (i32.and
             (i32.load8_u
              (get_local $28)
             )
             (i32.const 1)
            )
           )
          )
         )
         (i32.store8
          (tee_local $18
           (i32.add
            (get_local $0)
            (get_local $25)
           )
          )
          (i32.const 1)
         )
         (i32.store offset=151268
          (i32.const 0)
          (tee_local $17
           (call $_Z16getFreeFourPointhPct
            (get_local $20)
            (get_local $0)
            (i32.and
             (i32.or
              (get_local $26)
              (i32.and
               (i32.load16_u
                (get_local $28)
               )
               (i32.const 36863)
              )
             )
             (i32.const 65535)
            )
           )
          )
         )
         (block $label$41
          (block $label$42
           (br_if $label$42
            (i32.eqz
             (i32.and
              (get_local $17)
              (i32.const 255)
             )
            )
           )
           (set_local $20
            (i32.const 1)
           )
           (block $label$43
            (block $label$44
             (br_if $label$44
              (i32.eqz
               (call $_Z6isFoulhPc
                (i32.and
                 (i32.shr_u
                  (get_local $17)
                  (i32.const 8)
                 )
                 (i32.const 255)
                )
                (get_local $0)
               )
              )
             )
             (set_local $20
              (i32.const 1)
             )
             (loop $label$45
              (br_if $label$43
               (i32.gt_u
                (tee_local $17
                 (i32.and
                  (tee_local $20
                   (i32.add
                    (get_local $20)
                    (i32.const 1)
                   )
                  )
                  (i32.const 255)
                 )
                )
                (tee_local $24
                 (i32.load8_u offset=151268
                  (i32.const 0)
                 )
                )
               )
              )
              (br_if $label$45
               (call $_Z6isFoulhPc
                (i32.load8_u
                 (i32.add
                  (get_local $17)
                  (i32.const 151268)
                 )
                )
                (get_local $0)
               )
              )
             )
            )
            (set_local $24
             (i32.load8_u offset=151268
              (i32.const 0)
             )
            )
           )
           (br_if $label$41
            (i32.le_u
             (i32.and
              (get_local $20)
              (i32.const 255)
             )
             (i32.and
              (get_local $24)
              (i32.const 255)
             )
            )
           )
          )
          (i32.store16
           (get_local $28)
           (i32.and
            (i32.load16_u
             (get_local $28)
            )
            (i32.const 63742)
           )
          )
         )
         (i32.store8
          (get_local $18)
          (i32.const 0)
         )
        )
        (i32.store16
         (get_local $21)
         (i32.or
          (i32.or
           (i32.shl
            (get_local $13)
            (i32.const 4)
           )
           (get_local $26)
          )
          (i32.and
           (i32.load16_u
            (get_local $28)
           )
           (i32.const 36863)
          )
         )
        )
        (br $label$37)
       )
       (i32.store16
        (get_local $21)
        (i32.or
         (i32.and
          (get_local $20)
          (i32.const 36863)
         )
         (get_local $26)
        )
       )
      )
      (br_if $label$36
       (i32.ne
        (tee_local $25
         (i32.add
          (get_local $25)
          (i32.const 1)
         )
        )
        (i32.const 225)
       )
      )
      (br $label$34)
     )
    )
    (set_local $25
     (i32.const 0)
    )
    (loop $label$46
     (block $label$47
      (block $label$48
       (br_if $label$48
        (i32.ne
         (tee_local $21
          (i32.and
           (i32.shr_u
            (tee_local $20
             (i32.load16_u
              (tee_local $17
               (i32.add
                (get_local $25)
                (i32.const 151328)
               )
              )
             )
            )
            (i32.const 1)
           )
           (i32.const 7)
          )
         )
         (i32.const 5)
        )
       )
       (i32.store16
        (i32.add
         (get_local $2)
         (get_local $25)
        )
        (i32.or
         (i32.and
          (get_local $20)
          (i32.const 36863)
         )
         (get_local $26)
        )
       )
       (br $label$47)
      )
      (br_if $label$47
       (i32.gt_u
        (i32.add
         (get_local $21)
         (i32.const -3)
        )
        (i32.const 1)
       )
      )
      (i32.store16
       (get_local $17)
       (tee_local $20
        (i32.or
         (i32.ne
          (i32.and
           (get_local $20)
           (i32.const 1792)
          )
          (i32.const 0)
         )
         (get_local $20)
        )
       )
      )
      (br_if $label$47
       (i32.le_u
        (i32.and
         (get_local $20)
         (i32.const 31)
        )
        (i32.and
         (i32.load16_u
          (tee_local $21
           (i32.add
            (get_local $2)
            (get_local $25)
           )
          )
         )
         (i32.const 31)
        )
       )
      )
      (i32.store16
       (get_local $21)
       (i32.or
        (i32.and
         (get_local $20)
         (i32.const 36863)
        )
        (get_local $26)
       )
      )
     )
     (br_if $label$46
      (i32.ne
       (tee_local $25
        (i32.add
         (get_local $25)
         (i32.const 2)
        )
       )
       (i32.const 450)
      )
     )
    )
   )
   (br_if $label$2
    (i32.ne
     (tee_local $3
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z10isGameOverPcc (; 38 ;) (param $0 i32) (param $1 i32) (result i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (set_local $4
   (i32.add
    (tee_local $2
     (i32.load8_u offset=16
      (i32.const 0)
     )
    )
    (i32.const 14)
   )
  )
  (set_local $3
   (i32.sub
    (i32.const 15)
    (get_local $2)
   )
  )
  (set_local $6
   (i32.add
    (tee_local $5
     (i32.shl
      (get_local $2)
      (i32.const 1)
     )
    )
    (i32.const -5)
   )
  )
  (set_local $13
   (i32.and
    (get_local $1)
    (i32.const 255)
   )
  )
  (set_local $20
   (i32.const 0)
  )
  (set_local $19
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (tee_local $9
       (i32.and
        (tee_local $8
         (i32.add
          (tee_local $17
           (select
            (get_local $3)
            (i32.const 0)
            (i32.eq
             (tee_local $1
              (i32.and
               (get_local $19)
               (i32.const 255)
              )
             )
             (i32.const 2)
            )
           )
          )
          (select
           (get_local $2)
           (get_local $6)
           (i32.lt_u
            (get_local $1)
            (i32.const 2)
           )
          )
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $7
       (i32.and
        (get_local $17)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $10
     (i32.sub
      (i32.const 1)
      (get_local $7)
     )
    )
    (set_local $18
     (get_local $7)
    )
    (loop $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.ge_u
          (tee_local $16
           (i32.and
            (get_local $19)
            (i32.const 255)
           )
          )
          (i32.const 3)
         )
        )
        (set_local $14
         (i32.const 14)
        )
        (set_local $1
         (i32.const 14)
        )
        (set_local $15
         (get_local $4)
        )
        (br_if $label$4
         (i32.eq
          (get_local $16)
          (i32.const 2)
         )
        )
        (br $label$3)
       )
       (set_local $1
        (i32.const 14)
       )
       (block $label$6
        (br_if $label$6
         (i32.lt_u
          (tee_local $14
           (i32.and
            (get_local $17)
            (i32.const 255)
           )
          )
          (get_local $2)
         )
        )
        (set_local $1
         (i32.sub
          (select
           (i32.add
            (get_local $18)
            (i32.const 15)
           )
           (i32.const 29)
           (i32.lt_u
            (get_local $14)
            (i32.const 15)
           )
          )
          (get_local $2)
         )
        )
       )
       (set_local $14
        (i32.and
         (get_local $1)
         (i32.const 255)
        )
       )
      )
      (block $label$7
       (block $label$8
        (br_if $label$8
         (i32.ge_s
          (tee_local $16
           (i32.sub
            (get_local $18)
            (get_local $7)
           )
          )
          (get_local $2)
         )
        )
        (set_local $15
         (i32.add
          (i32.add
           (get_local $10)
           (get_local $18)
          )
          (get_local $14)
         )
        )
        (br $label$7)
       )
       (set_local $15
        (i32.add
         (i32.add
          (get_local $14)
          (i32.xor
           (get_local $16)
           (i32.const -1)
          )
         )
         (get_local $5)
        )
       )
      )
      (set_local $14
       (get_local $1)
      )
     )
     (block $label$9
      (br_if $label$9
       (i32.le_u
        (tee_local $11
         (i32.and
          (get_local $15)
          (i32.const 255)
         )
        )
        (tee_local $16
         (i32.and
          (get_local $14)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $18
       (i32.const 0)
      )
      (set_local $1
       (i32.const 0)
      )
      (loop $label$10
       (block $label$11
        (block $label$12
         (br_if $label$12
          (i32.eqz
           (tee_local $16
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.load8_u
               (i32.add
                (tee_local $12
                 (i32.add
                  (i32.mul
                   (i32.add
                    (i32.mul
                     (i32.and
                      (get_local $19)
                      (i32.const 255)
                     )
                     (i32.const 29)
                    )
                    (i32.and
                     (get_local $17)
                     (i32.const 255)
                    )
                   )
                   (i32.const 43)
                  )
                  (get_local $16)
                 )
                )
                (i32.const 65600)
               )
              )
             )
            )
           )
          )
         )
         (set_local $18
          (select
           (i32.add
            (get_local $18)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $16
            (i32.eq
             (get_local $16)
             (get_local $13)
            )
           )
          )
         )
         (set_local $1
          (select
           (get_local $1)
           (i32.const 0)
           (get_local $16)
          )
         )
         (br $label$11)
        )
        (set_local $1
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.ne
          (i32.add
           (tee_local $16
            (i32.and
             (get_local $18)
             (i32.const 255)
            )
           )
           (i32.and
            (get_local $1)
            (i32.const 255)
           )
          )
          (i32.const 5)
         )
        )
        (set_local $14
         (select
          (get_local $15)
          (get_local $14)
          (tee_local $16
           (i32.eq
            (get_local $16)
            (i32.const 5)
           )
          )
         )
        )
        (set_local $19
         (select
          (i32.const 4)
          (get_local $19)
          (get_local $16)
         )
        )
        (set_local $17
         (select
          (get_local $8)
          (get_local $17)
          (get_local $16)
         )
        )
        (set_local $20
         (i32.or
          (get_local $20)
          (get_local $16)
         )
        )
        (block $label$14
         (br_if $label$14
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $12)
               (i32.const 65596)
              )
             )
            )
           )
          )
         )
         (set_local $18
          (i32.add
           (get_local $18)
           (i32.const -1)
          )
         )
         (br $label$13)
        )
        (set_local $1
         (i32.add
          (get_local $1)
          (i32.const -1)
         )
        )
       )
       (br_if $label$10
        (i32.gt_u
         (get_local $11)
         (tee_local $16
          (i32.and
           (tee_local $14
            (i32.add
             (get_local $14)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$2
      (i32.gt_u
       (get_local $9)
       (tee_local $18
        (i32.and
         (tee_local $17
          (i32.add
           (get_local $17)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (br_if $label$0
    (i32.lt_u
     (i32.and
      (tee_local $19
       (i32.add
        (get_local $19)
        (i32.const 1)
       )
      )
      (i32.const 255)
     )
     (i32.const 4)
    )
   )
  )
  (i32.and
   (get_local $20)
   (i32.const 1)
  )
 )
 (func $_Z8getLevelPcc (; 39 ;) (param $0 i32) (param $1 i32) (result i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 i32)
  (local $22 i32)
  (set_local $10
   (i32.const -2)
  )
  (set_local $19
   (i32.const 151792)
  )
  (loop $label$0
   (i32.store16
    (get_local $19)
    (i32.const 0)
   )
   (set_local $19
    (i32.add
     (get_local $19)
     (i32.const 4)
    )
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $10
   (i32.const -1)
  )
  (set_local $19
   (i32.const 151794)
  )
  (loop $label$1
   (i32.store16
    (get_local $19)
    (i32.const 0)
   )
   (set_local $19
    (i32.add
     (get_local $19)
     (i32.const 4)
    )
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 2)
      )
     )
     (i32.const 224)
    )
   )
  )
  (set_local $11
   (i32.const 0)
  )
  (set_local $12
   (i32.const 0)
  )
  (loop $label$2
   (set_local $10
    (i32.const -2)
   )
   (set_local $19
    (i32.const 151328)
   )
   (loop $label$3
    (i32.store16
     (get_local $19)
     (i32.const 0)
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 4)
     )
    )
    (br_if $label$3
     (i32.lt_s
      (tee_local $10
       (i32.add
        (get_local $10)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $10
    (i32.const -1)
   )
   (set_local $19
    (i32.const 151330)
   )
   (loop $label$4
    (i32.store16
     (get_local $19)
     (i32.const 0)
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 4)
     )
    )
    (br_if $label$4
     (i32.lt_s
      (tee_local $10
       (i32.add
        (get_local $10)
        (i32.const 2)
       )
      )
      (i32.const 224)
     )
    )
   )
   (set_local $3
    (i32.and
     (tee_local $13
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $2
         (i32.load8_u offset=16
          (i32.const 0)
         )
        )
       )
       (i32.const 0)
       (i32.eq
        (tee_local $19
         (i32.and
          (get_local $12)
          (i32.const 255)
         )
        )
        (i32.const 2)
       )
      )
     )
     (i32.const 255)
    )
   )
   (block $label$5
    (block $label$6
     (br_if $label$6
      (i32.gt_u
       (get_local $19)
       (i32.const 1)
      )
     )
     (set_local $4
      (i32.add
       (get_local $3)
       (get_local $2)
      )
     )
     (br $label$5)
    )
    (set_local $4
     (i32.add
      (i32.add
       (i32.shl
        (get_local $2)
        (i32.const 1)
       )
       (get_local $3)
      )
      (i32.const -5)
     )
    )
   )
   (block $label$7
    (br_if $label$7
     (i32.le_u
      (tee_local $5
       (i32.and
        (get_local $4)
        (i32.const 255)
       )
      )
      (get_local $3)
     )
    )
    (set_local $8
     (i32.shl
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $7
     (i32.add
      (get_local $2)
      (i32.const 14)
     )
    )
    (set_local $6
     (i32.sub
      (i32.const 1)
      (get_local $3)
     )
    )
    (set_local $10
     (get_local $3)
    )
    (loop $label$8
     (block $label$9
      (block $label$10
       (block $label$11
        (br_if $label$11
         (i32.ge_u
          (tee_local $20
           (i32.and
            (get_local $12)
            (i32.const 255)
           )
          )
          (i32.const 3)
         )
        )
        (set_local $16
         (i32.const 14)
        )
        (set_local $19
         (i32.const 14)
        )
        (set_local $17
         (get_local $7)
        )
        (br_if $label$10
         (i32.eq
          (get_local $20)
          (i32.const 2)
         )
        )
        (br $label$9)
       )
       (set_local $19
        (i32.const 14)
       )
       (block $label$12
        (br_if $label$12
         (i32.lt_u
          (tee_local $20
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
          (get_local $2)
         )
        )
        (set_local $19
         (i32.sub
          (select
           (i32.add
            (get_local $10)
            (i32.const 15)
           )
           (i32.const 29)
           (i32.lt_u
            (get_local $20)
            (i32.const 15)
           )
          )
          (get_local $2)
         )
        )
       )
       (set_local $16
        (i32.and
         (get_local $19)
         (i32.const 255)
        )
       )
      )
      (block $label$13
       (block $label$14
        (br_if $label$14
         (i32.ge_s
          (tee_local $20
           (i32.sub
            (get_local $10)
            (get_local $3)
           )
          )
          (get_local $2)
         )
        )
        (set_local $17
         (i32.add
          (i32.add
           (get_local $6)
           (get_local $10)
          )
          (get_local $16)
         )
        )
        (br $label$13)
       )
       (set_local $17
        (i32.add
         (i32.add
          (get_local $16)
          (i32.xor
           (get_local $20)
           (i32.const -1)
          )
         )
         (get_local $8)
        )
       )
      )
      (set_local $16
       (get_local $19)
      )
     )
     (block $label$15
      (br_if $label$15
       (i32.le_u
        (tee_local $9
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (tee_local $10
         (i32.and
          (get_local $16)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $18
       (i32.const 0)
      )
      (set_local $22
       (i32.const 0)
      )
      (set_local $21
       (i32.const 0)
      )
      (set_local $20
       (i32.const 0)
      )
      (loop $label$16
       (block $label$17
        (block $label$18
         (br_if $label$18
          (i32.eqz
           (tee_local $19
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $15
               (i32.load8_u
                (i32.add
                 (tee_local $14
                  (i32.add
                   (i32.mul
                    (i32.add
                     (i32.mul
                      (i32.and
                       (get_local $12)
                       (i32.const 255)
                      )
                      (i32.const 29)
                     )
                     (i32.and
                      (get_local $13)
                      (i32.const 255)
                     )
                    )
                    (i32.const 43)
                   )
                   (get_local $10)
                  )
                 )
                 (i32.const 65600)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $21
          (select
           (i32.add
            (get_local $21)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $19
            (i32.eq
             (get_local $19)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $22
          (select
           (get_local $22)
           (get_local $18)
           (get_local $19)
          )
         )
         (set_local $20
          (select
           (get_local $20)
           (i32.const 0)
           (get_local $19)
          )
         )
         (br $label$17)
        )
        (i32.store8
         (i32.add
          (tee_local $19
           (i32.and
            (get_local $18)
            (i32.const 255)
           )
          )
          (i32.const 151296)
         )
         (get_local $15)
        )
        (i32.store8
         (i32.add
          (get_local $19)
          (i32.const 151312)
         )
         (get_local $16)
        )
        (set_local $18
         (i32.add
          (get_local $18)
          (i32.const 1)
         )
        )
        (set_local $20
         (i32.add
          (get_local $20)
          (i32.const 1)
         )
        )
       )
       (block $label$19
        (br_if $label$19
         (i32.ne
          (i32.add
           (tee_local $19
            (i32.and
             (get_local $21)
             (i32.const 255)
            )
           )
           (i32.and
            (get_local $20)
            (i32.const 255)
           )
          )
          (i32.const 5)
         )
        )
        (block $label$20
         (block $label$21
          (br_if $label$21
           (i32.eq
            (get_local $19)
            (i32.const 4)
           )
          )
          (br_if $label$20
           (i32.ne
            (get_local $19)
            (i32.const 5)
           )
          )
          (block $label$22
           (br_if $label$22
            (i32.ne
             (get_local $1)
             (i32.const 1)
            )
           )
           (br_if $label$22
            (i32.ne
             (i32.and
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 255)
             )
             (i32.const 2)
            )
           )
           (br_if $label$20
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 65595)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$20
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 65601)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
          )
          (set_local $11
           (i32.const 1)
          )
          (set_local $12
           (i32.const 4)
          )
          (set_local $13
           (get_local $4)
          )
          (set_local $16
           (get_local $17)
          )
          (br $label$20)
         )
         (block $label$23
          (block $label$24
           (br_if $label$24
            (i32.ne
             (get_local $1)
             (i32.const 1)
            )
           )
           (br_if $label$24
            (i32.ne
             (i32.and
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 255)
             )
             (i32.const 2)
            )
           )
           (br_if $label$20
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 65595)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$20
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 65601)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$23
            (i32.lt_u
             (i32.and
              (get_local $22)
              (i32.const 255)
             )
             (i32.and
              (get_local $18)
              (i32.const 255)
             )
            )
           )
           (br $label$20)
          )
          (br_if $label$20
           (i32.ge_u
            (i32.and
             (get_local $22)
             (i32.const 255)
            )
            (i32.and
             (get_local $18)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $15
          (i32.and
           (get_local $18)
           (i32.const 255)
          )
         )
         (set_local $19
          (i32.and
           (get_local $22)
           (i32.const 255)
          )
         )
         (loop $label$25
          (i32.store16
           (i32.add
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $19)
               (i32.const 151296)
              )
             )
             (i32.const 1)
            )
            (i32.const 151328)
           )
           (i32.or
            (i32.shl
             (i32.sub
              (get_local $10)
              (i32.load8_u
               (i32.add
                (get_local $19)
                (i32.const 151312)
               )
              )
             )
             (i32.const 5)
            )
            (i32.const 10)
           )
          )
          (br_if $label$25
           (i32.ne
            (get_local $15)
            (tee_local $19
             (i32.add
              (get_local $19)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$26
         (br_if $label$26
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $14)
               (i32.const 65596)
              )
             )
            )
           )
          )
         )
         (set_local $21
          (i32.add
           (get_local $21)
           (i32.const -1)
          )
         )
         (br $label$19)
        )
        (set_local $22
         (i32.add
          (get_local $22)
          (i32.const 1)
         )
        )
        (set_local $20
         (i32.add
          (get_local $20)
          (i32.const -1)
         )
        )
       )
       (br_if $label$16
        (i32.gt_u
         (get_local $9)
         (tee_local $10
          (i32.and
           (tee_local $16
            (i32.add
             (get_local $16)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$8
      (i32.gt_u
       (get_local $5)
       (tee_local $10
        (i32.and
         (tee_local $13
          (i32.add
           (get_local $13)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $20
    (i32.shl
     (i32.and
      (get_local $12)
      (i32.const 255)
     )
     (i32.const 12)
    )
   )
   (set_local $19
    (i32.const -450)
   )
   (loop $label$27
    (block $label$28
     (br_if $label$28
      (i32.ne
       (i32.and
        (tee_local $10
         (i32.load16_u
          (i32.add
           (get_local $19)
           (i32.const 151778)
          )
         )
        )
        (i32.const 14)
       )
       (i32.const 10)
      )
     )
     (i32.store16
      (i32.add
       (get_local $19)
       (i32.const 152242)
      )
      (i32.or
       (i32.and
        (get_local $10)
        (i32.const 36863)
       )
       (get_local $20)
      )
     )
    )
    (br_if $label$27
     (tee_local $19
      (i32.add
       (get_local $19)
       (i32.const 2)
      )
     )
    )
   )
   (br_if $label$2
    (i32.lt_u
     (i32.and
      (tee_local $12
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
      (i32.const 255)
     )
     (i32.const 4)
    )
   )
  )
  (set_local $19
   (i32.const 10)
  )
  (block $label$29
   (block $label$30
    (block $label$31
     (br_if $label$31
      (i32.and
       (get_local $11)
       (i32.const 1)
      )
     )
     (set_local $10
      (i32.const 0)
     )
     (set_local $19
      (i32.const 151792)
     )
     (set_local $21
      (i32.const 255)
     )
     (loop $label$32
      (block $label$33
       (br_if $label$33
        (i32.ne
         (i32.and
          (i32.load16_u
           (get_local $19)
          )
          (i32.const 14)
         )
         (i32.const 10)
        )
       )
       (block $label$34
        (br_if $label$34
         (i32.eq
          (tee_local $20
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
          )
          (i32.const 255)
         )
        )
        (br_if $label$33
         (i32.eq
          (get_local $10)
          (get_local $20)
         )
        )
        (br $label$29)
       )
       (set_local $21
        (get_local $10)
       )
      )
      (set_local $19
       (i32.add
        (get_local $19)
        (i32.const 2)
       )
      )
      (br_if $label$32
       (i32.lt_u
        (tee_local $10
         (i32.add
          (get_local $10)
          (i32.const 1)
         )
        )
        (i32.const 225)
       )
      )
     )
     (br_if $label$30
      (i32.eq
       (tee_local $19
        (i32.and
         (get_local $21)
         (i32.const 255)
        )
       )
       (i32.const 255)
      )
     )
     (block $label$35
      (br_if $label$35
       (i32.ne
        (get_local $1)
        (i32.const 2)
       )
      )
      (br_if $label$35
       (i32.ne
        (i32.and
         (i32.load8_u offset=32
          (i32.const 0)
         )
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (br_if $label$35
       (i32.eqz
        (call $_Z6isFoulhPc
         (i32.and
          (get_local $21)
          (i32.const 255)
         )
         (get_local $0)
        )
       )
      )
      (return
       (i32.or
        (i32.shl
         (get_local $19)
         (i32.const 8)
        )
        (i32.const 9)
       )
      )
     )
     (set_local $19
      (i32.or
       (i32.shl
        (get_local $19)
        (i32.const 8)
       )
       (i32.const 8)
      )
     )
    )
    (return
     (get_local $19)
    )
   )
   (return
    (i32.const 0)
   )
  )
  (i32.or
   (i32.shl
    (get_local $20)
    (i32.const 8)
   )
   (i32.const 9)
  )
 )
 (func $_Z13getLevelPointhcPc (; 40 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (set_local $4
   (i32.load8_u
    (tee_local $3
     (i32.add
      (get_local $2)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $3)
   (get_local $1)
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $7
   (i32.const 10)
  )
  (set_local $8
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.gt_u
       (tee_local $6
        (i32.add
         (i32.and
          (tee_local $5
           (call $_Z12testLineFourhhcPc
            (get_local $0)
            (i32.const 0)
            (get_local $1)
            (get_local $2)
           )
          )
          (i32.const 31)
         )
         (i32.const -8)
        )
       )
       (i32.const 16)
      )
     )
     (set_local $10
      (i32.const 0)
     )
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (block $label$7
          (br_table $label$7 $label$6 $label$0 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$1 $label$5 $label$7
           (get_local $6)
          )
         )
         (set_local $8
          (i32.const 1)
         )
         (br $label$3)
        )
        (set_local $9
         (i32.const 128)
        )
        (br $label$4)
       )
       (set_local $9
        (i32.const 64)
       )
      )
      (set_local $8
       (i32.const 2)
      )
     )
     (set_local $10
      (get_local $5)
     )
     (br $label$1)
    )
    (set_local $10
     (i32.const 0)
    )
   )
   (block $label$8
    (br_if $label$8
     (i32.gt_u
      (tee_local $6
       (i32.add
        (i32.and
         (tee_local $5
          (call $_Z12testLineFourhhcPc
           (get_local $0)
           (i32.const 1)
           (get_local $1)
           (get_local $2)
          )
         )
         (i32.const 31)
        )
        (i32.const -8)
       )
      )
      (i32.const 16)
     )
    )
    (block $label$9
     (block $label$10
      (block $label$11
       (block $label$12
        (br_table $label$12 $label$11 $label$0 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$8 $label$10 $label$12
         (get_local $6)
        )
       )
       (set_local $8
        (i32.add
         (get_local $8)
         (i32.const 1)
        )
       )
       (br $label$9)
      )
      (set_local $8
       (i32.add
        (get_local $8)
        (i32.const 2)
       )
      )
      (set_local $9
       (i32.const 128)
      )
      (br $label$9)
     )
     (set_local $9
      (select
       (get_local $9)
       (i32.const 64)
       (i32.gt_u
        (get_local $9)
        (i32.const 64)
       )
      )
     )
     (set_local $8
      (i32.add
       (get_local $8)
       (i32.const 2)
      )
     )
    )
    (set_local $10
     (get_local $5)
    )
   )
   (block $label$13
    (br_if $label$13
     (i32.gt_u
      (tee_local $6
       (i32.add
        (i32.and
         (tee_local $5
          (call $_Z12testLineFourhhcPc
           (get_local $0)
           (i32.const 2)
           (get_local $1)
           (get_local $2)
          )
         )
         (i32.const 31)
        )
        (i32.const -8)
       )
      )
      (i32.const 16)
     )
    )
    (block $label$14
     (block $label$15
      (block $label$16
       (block $label$17
        (br_table $label$17 $label$16 $label$0 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$13 $label$15 $label$17
         (get_local $6)
        )
       )
       (set_local $8
        (i32.add
         (i32.and
          (get_local $8)
          (i32.const 255)
         )
         (i32.const 1)
        )
       )
       (br $label$14)
      )
      (set_local $8
       (i32.add
        (i32.and
         (get_local $8)
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (set_local $9
       (i32.const 128)
      )
      (br $label$14)
     )
     (set_local $9
      (select
       (get_local $9)
       (i32.const 64)
       (i32.gt_u
        (get_local $9)
        (i32.const 64)
       )
      )
     )
     (set_local $8
      (i32.add
       (i32.and
        (get_local $8)
        (i32.const 255)
       )
       (i32.const 2)
      )
     )
    )
    (set_local $10
     (get_local $5)
    )
   )
   (block $label$18
    (br_if $label$18
     (i32.gt_u
      (tee_local $6
       (i32.add
        (i32.and
         (tee_local $5
          (call $_Z12testLineFourhhcPc
           (get_local $0)
           (i32.const 3)
           (get_local $1)
           (get_local $2)
          )
         )
         (i32.const 31)
        )
        (i32.const -8)
       )
      )
      (i32.const 16)
     )
    )
    (block $label$19
     (block $label$20
      (block $label$21
       (block $label$22
        (br_table $label$22 $label$21 $label$0 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$18 $label$20 $label$22
         (get_local $6)
        )
       )
       (set_local $8
        (i32.add
         (i32.and
          (get_local $8)
          (i32.const 255)
         )
         (i32.const 1)
        )
       )
       (br $label$19)
      )
      (set_local $9
       (select
        (get_local $9)
        (i32.const 128)
        (i32.gt_u
         (get_local $9)
         (i32.const 128)
        )
       )
      )
      (set_local $8
       (i32.add
        (i32.and
         (get_local $8)
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (br $label$19)
     )
     (set_local $9
      (select
       (get_local $9)
       (i32.const 64)
       (i32.gt_u
        (get_local $9)
        (i32.const 64)
       )
      )
     )
     (set_local $8
      (i32.add
       (i32.and
        (get_local $8)
        (i32.const 255)
       )
       (i32.const 2)
      )
     )
    )
    (set_local $10
     (get_local $5)
    )
   )
   (block $label$23
    (block $label$24
     (block $label$25
      (br_if $label$25
       (i32.eqz
        (tee_local $8
         (i32.and
          (get_local $8)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $0
       (call $_Z17getBlockFourPointhPct
        (get_local $0)
        (get_local $2)
        (get_local $10)
       )
      )
      (br_if $label$24
       (i32.ne
        (get_local $8)
        (i32.const 1)
       )
      )
      (set_local $8
       (i32.const 8)
      )
      (br_if $label$23
       (i32.ne
        (get_local $1)
        (i32.const 2)
       )
      )
      (br_if $label$23
       (i32.ne
        (i32.and
         (i32.load8_u offset=32
          (i32.const 0)
         )
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (set_local $8
       (select
        (i32.const 9)
        (i32.const 8)
        (call $_Z6isFoulhPc
         (get_local $0)
         (get_local $2)
        )
       )
      )
      (br $label$23)
     )
     (set_local $7
      (i32.const 0)
     )
     (br $label$0)
    )
    (set_local $9
     (select
      (get_local $9)
      (i32.const 32)
      (i32.gt_u
       (get_local $9)
       (i32.const 32)
      )
     )
    )
    (set_local $8
     (i32.const 9)
    )
   )
   (set_local $7
    (i32.or
     (i32.or
      (get_local $8)
      (i32.shl
       (get_local $0)
       (i32.const 8)
      )
     )
     (get_local $9)
    )
   )
  )
  (i32.store8
   (get_local $3)
   (get_local $4)
  )
  (i32.and
   (get_local $7)
   (i32.const 65535)
  )
 )
 (func $_Z5isVCFcPcPhh (; 41 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.eqz
         (get_local $3)
        )
       )
       (set_local $12
        (i32.const 0)
       )
       (set_local $8
        (i32.add
         (get_local $0)
         (i32.const 287280)
        )
       )
       (set_local $7
        (i32.const 0)
       )
       (set_local $9
        (i32.const 0)
       )
       (loop $label$5
        (block $label$6
         (block $label$7
          (br_if $label$7
           (i32.eqz
            (i32.and
             (get_local $9)
             (i32.const 65535)
            )
           )
          )
          (set_local $5
           (call $_Z13getLevelPointhcPc
            (i32.load8_u
             (i32.add
              (i32.add
               (get_local $2)
               (get_local $12)
              )
              (i32.const -1)
             )
            )
            (tee_local $4
             (i32.load8_s
              (get_local $8)
             )
            )
            (get_local $1)
           )
          )
          (br $label$6)
         )
         (set_local $5
          (call $_Z8getLevelPcc
           (get_local $1)
           (tee_local $4
            (i32.load8_s
             (get_local $8)
            )
           )
          )
         )
        )
        (block $label$8
         (block $label$9
          (block $label$10
           (br_if $label$10
            (i32.gt_u
             (tee_local $9
              (i32.and
               (get_local $5)
               (i32.const 31)
              )
             )
             (i32.const 7)
            )
           )
           (br_if $label$9
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $1)
               (tee_local $10
                (i32.load8_u
                 (tee_local $9
                  (i32.add
                   (get_local $2)
                   (get_local $12)
                  )
                 )
                )
               )
              )
             )
            )
           )
           (br $label$8)
          )
          (br_if $label$8
           (i32.ne
            (get_local $9)
            (i32.const 8)
           )
          )
          (br_if $label$8
           (i32.ne
            (tee_local $10
             (i32.load8_u
              (tee_local $9
               (i32.add
                (get_local $2)
                (get_local $12)
               )
              )
             )
            )
            (i32.shr_u
             (get_local $5)
             (i32.const 8)
            )
           )
          )
         )
         (br_if $label$8
          (i32.ne
           (i32.and
            (tee_local $5
             (call $_Z13testPointFourhcPc
              (get_local $10)
              (get_local $0)
              (get_local $1)
             )
            )
            (i32.const 30)
           )
           (i32.const 8)
          )
         )
         (i32.store8
          (i32.add
           (i32.and
            (get_local $7)
            (i32.const 255)
           )
           (i32.const 219936)
          )
          (i32.load8_u
           (get_local $9)
          )
         )
         (i32.store8
          (i32.add
           (get_local $1)
           (i32.load8_u
            (get_local $9)
           )
          )
          (get_local $0)
         )
         (set_local $10
          (i32.or
           (get_local $7)
           (i32.const 1)
          )
         )
         (set_local $9
          (i32.load8_u
           (get_local $9)
          )
         )
         (br_if $label$3
          (i32.ge_u
           (tee_local $6
            (i32.add
             (get_local $12)
             (i32.const 1)
            )
           )
           (get_local $3)
          )
         )
         (set_local $11
          (i32.const 0)
         )
         (br_if $label$2
          (i32.ne
           (tee_local $9
            (call $_Z17getBlockFourPointhPct
             (i32.and
              (get_local $9)
              (i32.const 255)
             )
             (get_local $1)
             (get_local $5)
            )
           )
           (i32.load8_u
            (i32.add
             (get_local $2)
             (get_local $6)
            )
           )
          )
         )
         (br_if $label$2
          (i32.load8_u
           (tee_local $5
            (i32.add
             (get_local $1)
             (get_local $9)
            )
           )
          )
         )
         (i32.store8
          (i32.add
           (i32.and
            (get_local $10)
            (i32.const 255)
           )
           (i32.const 219936)
          )
          (get_local $9)
         )
         (i32.store8
          (get_local $5)
          (get_local $4)
         )
         (set_local $7
          (i32.add
           (get_local $7)
           (i32.const 2)
          )
         )
         (br_if $label$5
          (i32.lt_u
           (tee_local $12
            (i32.and
             (tee_local $9
              (i32.add
               (get_local $12)
               (i32.const 2)
              )
             )
             (i32.const 65535)
            )
           )
           (get_local $3)
          )
         )
        )
       )
       (set_local $11
        (i32.const 0)
       )
       (br_if $label$1
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
       )
       (br $label$0)
      )
      (return
       (i32.const 0)
      )
     )
     (set_local $11
      (i32.eq
       (i32.and
        (call $_Z13getLevelPointhcPc
         (i32.and
          (get_local $9)
          (i32.const 255)
         )
         (get_local $0)
         (get_local $1)
        )
        (i32.const 31)
       )
       (i32.const 9)
      )
     )
    )
    (set_local $7
     (get_local $10)
    )
   )
   (set_local $7
    (i32.and
     (get_local $7)
     (i32.const 255)
    )
   )
   (set_local $12
    (i32.const 0)
   )
   (loop $label$11
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (get_local $12)
        (i32.const 219936)
       )
      )
     )
     (i32.const 0)
    )
    (br_if $label$11
     (i32.ne
      (get_local $7)
      (tee_local $12
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
  (get_local $11)
 )
 (func $_Z9simpleVCFcPcPhRh (; 42 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (tee_local $8
      (i32.load8_u
       (get_local $3)
      )
     )
     (i32.const 6)
    )
   )
   (set_local $5
    (i32.shr_s
     (i32.add
      (i32.shl
       (get_local $8)
       (i32.const 16)
      )
      (i32.const -393216)
     )
     (i32.const 16)
    )
   )
   (set_local $9
    (i32.const 0)
   )
   (set_local $7
    (i32.add
     (get_local $0)
     (i32.const 287280)
    )
   )
   (set_local $6
    (i32.const 0)
   )
   (loop $label$1
    (set_local $8
     (get_local $0)
    )
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (i32.and
        (get_local $9)
        (i32.const 1)
       )
      )
     )
     (set_local $8
      (i32.load8_u
       (get_local $7)
      )
     )
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (get_local $2)
        (get_local $9)
       )
      )
     )
     (get_local $8)
    )
    (br_if $label$1
     (i32.ge_s
      (get_local $5)
      (tee_local $9
       (i32.and
        (tee_local $6
         (i32.add
          (get_local $6)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
   )
   (set_local $8
    (i32.load8_u
     (get_local $3)
    )
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.lt_s
     (tee_local $7
      (i32.shl
       (tee_local $6
        (i32.add
         (i32.and
          (get_local $8)
          (i32.const 255)
         )
         (i32.const 65531)
        )
       )
       (i32.const 16)
      )
     )
     (i32.const -65535)
    )
   )
   (loop $label$4
    (set_local $9
     (i32.const 0)
    )
    (block $label$5
     (br_if $label$5
      (i32.le_u
       (i32.and
        (get_local $8)
        (i32.const 255)
       )
       (i32.and
        (tee_local $8
         (i32.add
          (tee_local $4
           (i32.shr_s
            (get_local $7)
            (i32.const 16)
           )
          )
          (i32.const 2)
         )
        )
        (i32.const 255)
       )
      )
     )
     (set_local $9
      (i32.const 0)
     )
     (loop $label$6
      (i32.store8
       (i32.add
        (i32.and
         (get_local $9)
         (i32.const 255)
        )
        (i32.const 220416)
       )
       (i32.load8_u
        (i32.add
         (get_local $2)
         (i32.and
          (get_local $8)
          (i32.const 255)
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
      (br_if $label$6
       (i32.lt_u
        (i32.and
         (tee_local $8
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
        (i32.load8_u
         (get_local $3)
        )
       )
      )
     )
    )
    (block $label$7
     (br_if $label$7
      (i32.eqz
       (call $_Z5isVCFcPcPhh
        (get_local $0)
        (get_local $1)
        (i32.const 220416)
        (tee_local $5
         (i32.and
          (get_local $9)
          (i32.const 255)
         )
        )
       )
      )
     )
     (i32.store8
      (get_local $3)
      (get_local $6)
     )
     (br_if $label$7
      (i32.eqz
       (get_local $5)
      )
     )
     (set_local $9
      (i32.load8_u offset=220416
       (i32.const 0)
      )
     )
     (i32.store8
      (get_local $3)
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (get_local $2)
       (i32.and
        (get_local $6)
        (i32.const 255)
       )
      )
      (get_local $9)
     )
     (br_if $label$7
      (i32.eq
       (get_local $5)
       (i32.const 1)
      )
     )
     (set_local $9
      (i32.const 1)
     )
     (loop $label$8
      (set_local $8
       (i32.load8_u
        (i32.add
         (get_local $9)
         (i32.const 220416)
        )
       )
      )
      (i32.store8
       (get_local $3)
       (i32.add
        (tee_local $6
         (i32.load8_u
          (get_local $3)
         )
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (i32.add
        (get_local $2)
        (get_local $6)
       )
       (get_local $8)
      )
      (br_if $label$8
       (i32.ne
        (get_local $5)
        (tee_local $9
         (i32.add
          (get_local $9)
          (i32.const 1)
         )
        )
       )
      )
     )
    )
    (br_if $label$3
     (i32.lt_s
      (get_local $7)
      (i32.const 131072)
     )
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (i32.add
         (get_local $2)
         (get_local $4)
        )
        (i32.const -1)
       )
      )
     )
     (i32.const 0)
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (get_local $2)
        (tee_local $6
         (i32.add
          (get_local $4)
          (i32.const -2)
         )
        )
       )
      )
     )
     (i32.const 0)
    )
    (br_if $label$3
     (i32.lt_s
      (tee_local $7
       (i32.shl
        (get_local $6)
        (i32.const 16)
       )
      )
      (i32.const -65535)
     )
    )
    (set_local $8
     (i32.load8_u
      (get_local $3)
     )
    )
    (br $label$4)
   )
  )
 )
 (func $_Z17getBlockVCFBufferv (; 43 ;) (result i32)
  (i32.const 220656)
 )
 (func $_Z11getBlockVCFPccPhhb (; 44 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 i32)
  (local $22 i32)
  (local $23 i32)
  (local $24 i32)
  (local $25 i32)
  (local $26 i32)
  (local $27 i32)
  (local $28 i32)
  (set_local $6
   (i32.load8_u
    (i32.add
     (get_local $2)
     (tee_local $5
      (i32.add
       (get_local $3)
       (i32.const -1)
      )
     )
    )
   )
  )
  (set_local $22
   (i32.const -2)
  )
  (set_local $27
   (get_local $3)
  )
  (loop $label$0
   (i32.store8
    (i32.add
     (get_local $22)
     (i32.const 220658)
    )
    (i32.const 0)
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $22
      (i32.add
       (get_local $22)
       (i32.const 2)
      )
     )
     (i32.const 950)
    )
   )
  )
  (set_local $22
   (i32.const -1)
  )
  (loop $label$1
   (i32.store8
    (i32.add
     (get_local $22)
     (i32.const 220658)
    )
    (i32.const 0)
   )
   (br_if $label$1
    (i32.lt_s
     (tee_local $22
      (i32.add
       (get_local $22)
       (i32.const 2)
      )
     )
     (i32.const 950)
    )
   )
  )
  (call $_Z8testFourPccPt
   (get_local $0)
   (tee_local $7
    (i32.load8_s
     (i32.add
      (get_local $1)
      (i32.const 287280)
     )
    )
   )
   (i32.const 221152)
  )
  (set_local $23
   (i32.const 0)
  )
  (block $label$2
   (block $label$3
    (block $label$4
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (block $label$9
          (block $label$10
           (block $label$11
            (block $label$12
             (block $label$13
              (block $label$14
               (block $label$15
                (block $label$16
                 (block $label$17
                  (block $label$18
                   (block $label$19
                    (br_if $label$19
                     (i32.ne
                      (get_local $1)
                      (i32.const 1)
                     )
                    )
                    (br_if $label$19
                     (i32.ne
                      (i32.and
                       (i32.load8_u offset=32
                        (i32.const 0)
                       )
                       (i32.const 255)
                      )
                      (i32.const 2)
                     )
                    )
                    (br_if $label$17
                     (i32.eqz
                      (get_local $3)
                     )
                    )
                    (set_local $24
                     (i32.const 0)
                    )
                    (set_local $8
                     (i32.const 0)
                    )
                    (set_local $26
                     (i32.const 0)
                    )
                    (set_local $27
                     (i32.const 0)
                    )
                    (loop $label$20
                     (i32.store8
                      (i32.add
                       (get_local $0)
                       (i32.load8_u
                        (i32.add
                         (get_local $2)
                         (i32.and
                          (get_local $27)
                          (i32.const 255)
                         )
                        )
                       )
                      )
                      (i32.const 1)
                     )
                     (set_local $11
                      (i32.eq
                       (tee_local $10
                        (i32.and
                         (tee_local $9
                          (call $_Z13testLineThreehhcPc
                           (i32.load8_u
                            (tee_local $22
                             (i32.add
                              (get_local $2)
                              (get_local $24)
                             )
                            )
                           )
                           (i32.const 0)
                           (i32.const 1)
                           (get_local $0)
                          )
                         )
                         (i32.const 15)
                        )
                       )
                       (i32.const 7)
                      )
                     )
                     (block $label$21
                      (block $label$22
                       (br_if $label$22
                        (i32.ne
                         (tee_local $25
                          (i32.and
                           (tee_local $23
                            (i32.add
                             (get_local $27)
                             (i32.const 1)
                            )
                           )
                           (i32.const 255)
                          )
                         )
                         (get_local $3)
                        )
                       )
                       (block $label$23
                        (br_if $label$23
                         (i32.ne
                          (get_local $10)
                          (i32.const 9)
                         )
                        )
                        (i32.store16
                         (i32.add
                          (i32.shl
                           (i32.and
                            (get_local $26)
                            (i32.const 255)
                           )
                           (i32.const 1)
                          )
                          (i32.const 221112)
                         )
                         (get_local $9)
                        )
                        (set_local $26
                         (i32.add
                          (get_local $26)
                          (i32.const 1)
                         )
                        )
                        (set_local $8
                         (i32.add
                          (i32.and
                           (get_local $8)
                           (i32.const 255)
                          )
                          (i32.const 2)
                         )
                        )
                       )
                       (set_local $11
                        (i32.add
                         (get_local $11)
                         (i32.eq
                          (tee_local $10
                           (i32.and
                            (tee_local $9
                             (call $_Z13testLineThreehhcPc
                              (i32.load8_u
                               (get_local $22)
                              )
                              (i32.const 1)
                              (i32.const 1)
                              (get_local $0)
                             )
                            )
                            (i32.const 15)
                           )
                          )
                          (i32.const 7)
                         )
                        )
                       )
                       (block $label$24
                        (br_if $label$24
                         (i32.ne
                          (get_local $10)
                          (i32.const 9)
                         )
                        )
                        (i32.store16
                         (i32.add
                          (i32.shl
                           (i32.and
                            (get_local $26)
                            (i32.const 255)
                           )
                           (i32.const 1)
                          )
                          (i32.const 221112)
                         )
                         (get_local $9)
                        )
                        (set_local $26
                         (i32.add
                          (get_local $26)
                          (i32.const 1)
                         )
                        )
                        (set_local $8
                         (i32.add
                          (i32.and
                           (get_local $8)
                           (i32.const 255)
                          )
                          (i32.const 2)
                         )
                        )
                       )
                       (set_local $11
                        (i32.add
                         (get_local $11)
                         (i32.eq
                          (tee_local $10
                           (i32.and
                            (tee_local $9
                             (call $_Z13testLineThreehhcPc
                              (i32.load8_u
                               (get_local $22)
                              )
                              (i32.const 2)
                              (i32.const 1)
                              (get_local $0)
                             )
                            )
                            (i32.const 15)
                           )
                          )
                          (i32.const 7)
                         )
                        )
                       )
                       (block $label$25
                        (br_if $label$25
                         (i32.ne
                          (get_local $10)
                          (i32.const 9)
                         )
                        )
                        (i32.store16
                         (i32.add
                          (i32.shl
                           (i32.and
                            (get_local $26)
                            (i32.const 255)
                           )
                           (i32.const 1)
                          )
                          (i32.const 221112)
                         )
                         (get_local $9)
                        )
                        (set_local $26
                         (i32.add
                          (get_local $26)
                          (i32.const 1)
                         )
                        )
                        (set_local $8
                         (i32.add
                          (i32.and
                           (get_local $8)
                           (i32.const 255)
                          )
                          (i32.const 2)
                         )
                        )
                       )
                       (set_local $22
                        (i32.add
                         (get_local $11)
                         (i32.eq
                          (tee_local $10
                           (i32.and
                            (tee_local $9
                             (call $_Z13testLineThreehhcPc
                              (i32.load8_u
                               (get_local $22)
                              )
                              (i32.const 3)
                              (i32.const 1)
                              (get_local $0)
                             )
                            )
                            (i32.const 15)
                           )
                          )
                          (i32.const 7)
                         )
                        )
                       )
                       (br_if $label$21
                        (i32.ne
                         (get_local $10)
                         (i32.const 9)
                        )
                       )
                       (i32.store16
                        (i32.add
                         (i32.shl
                          (i32.and
                           (get_local $26)
                           (i32.const 255)
                          )
                          (i32.const 1)
                         )
                         (i32.const 221112)
                        )
                        (get_local $9)
                       )
                       (set_local $26
                        (i32.add
                         (get_local $26)
                         (i32.const 1)
                        )
                       )
                       (set_local $8
                        (i32.add
                         (i32.and
                          (get_local $8)
                          (i32.const 255)
                         )
                         (i32.const 2)
                        )
                       )
                       (br $label$21)
                      )
                      (set_local $22
                       (i32.add
                        (i32.add
                         (i32.add
                          (get_local $11)
                          (i32.eq
                           (i32.and
                            (call $_Z13testLineThreehhcPc
                             (i32.load8_u
                              (get_local $22)
                             )
                             (i32.const 1)
                             (i32.const 1)
                             (get_local $0)
                            )
                            (i32.const 15)
                           )
                           (i32.const 7)
                          )
                         )
                         (i32.eq
                          (i32.and
                           (call $_Z13testLineThreehhcPc
                            (i32.load8_u
                             (get_local $22)
                            )
                            (i32.const 2)
                            (i32.const 1)
                            (get_local $0)
                           )
                           (i32.const 15)
                          )
                          (i32.const 7)
                         )
                        )
                        (i32.eq
                         (i32.and
                          (call $_Z13testLineThreehhcPc
                           (i32.load8_u
                            (get_local $22)
                           )
                           (i32.const 3)
                           (i32.const 1)
                           (get_local $0)
                          )
                          (i32.const 15)
                         )
                         (i32.const 7)
                        )
                       )
                      )
                     )
                     (br_if $label$8
                      (i32.ge_u
                       (i32.and
                        (get_local $22)
                        (i32.const 255)
                       )
                       (i32.const 2)
                      )
                     )
                     (block $label$26
                      (br_if $label$26
                       (i32.ge_u
                        (get_local $25)
                        (get_local $3)
                       )
                      )
                      (i32.store8
                       (i32.add
                        (get_local $0)
                        (i32.load8_u
                         (i32.add
                          (get_local $2)
                          (get_local $25)
                         )
                        )
                       )
                       (i32.const 2)
                      )
                      (set_local $23
                       (i32.add
                        (get_local $27)
                        (i32.const 2)
                       )
                      )
                     )
                     (set_local $27
                      (get_local $23)
                     )
                     (br_if $label$20
                      (i32.lt_u
                       (tee_local $24
                        (i32.and
                         (i32.add
                          (get_local $24)
                          (i32.const 2)
                         )
                         (i32.const 65535)
                        )
                       )
                       (get_local $3)
                      )
                     )
                     (br $label$18)
                    )
                   )
                   (block $label$27
                    (br_if $label$27
                     (i32.eqz
                      (get_local $3)
                     )
                    )
                    (set_local $24
                     (i32.and
                      (i32.add
                       (get_local $3)
                       (i32.const -1)
                      )
                      (i32.const 255)
                     )
                    )
                    (set_local $22
                     (i32.const 0)
                    )
                    (set_local $26
                     (get_local $2)
                    )
                    (loop $label$28
                     (i32.store8
                      (i32.add
                       (get_local $0)
                       (i32.load8_u
                        (get_local $26)
                       )
                      )
                      (select
                       (get_local $7)
                       (get_local $1)
                       (i32.and
                        (get_local $22)
                        (i32.const 1)
                       )
                      )
                     )
                     (set_local $26
                      (i32.add
                       (get_local $26)
                       (i32.const 1)
                      )
                     )
                     (set_local $22
                      (i32.add
                       (get_local $22)
                       (i32.const 1)
                      )
                     )
                     (br_if $label$28
                      (tee_local $27
                       (i32.add
                        (get_local $27)
                        (i32.const -1)
                       )
                      )
                     )
                    )
                    (set_local $23
                     (i32.add
                      (get_local $24)
                      (i32.const 1)
                     )
                    )
                   )
                   (set_local $26
                    (i32.const 0)
                   )
                   (set_local $8
                    (i32.const 1)
                   )
                   (block $label$29
                    (block $label$30
                     (br_if $label$30
                      (i32.eq
                       (tee_local $22
                        (i32.and
                         (tee_local $27
                          (call $_Z12testLineFourhhcPc
                           (get_local $6)
                           (i32.const 0)
                           (get_local $1)
                           (get_local $0)
                          )
                         )
                         (i32.const 31)
                        )
                       )
                       (i32.const 8)
                      )
                     )
                     (block $label$31
                      (br_if $label$31
                       (i32.eq
                        (get_local $22)
                        (i32.const 9)
                       )
                      )
                      (set_local $8
                       (i32.const 0)
                      )
                      (br_if $label$29
                       (i32.ne
                        (get_local $22)
                        (i32.const 24)
                       )
                      )
                     )
                     (set_local $8
                      (i32.const 2)
                     )
                    )
                    (i32.store16 offset=221112
                     (i32.const 0)
                     (get_local $27)
                    )
                    (set_local $26
                     (i32.const 1)
                    )
                   )
                   (set_local $22
                    (i32.const 1)
                   )
                   (block $label$32
                    (block $label$33
                     (br_if $label$33
                      (i32.eq
                       (tee_local $27
                        (i32.and
                         (tee_local $24
                          (call $_Z12testLineFourhhcPc
                           (get_local $6)
                           (i32.const 1)
                           (get_local $1)
                           (get_local $0)
                          )
                         )
                         (i32.const 31)
                        )
                       )
                       (i32.const 8)
                      )
                     )
                     (block $label$34
                      (br_if $label$34
                       (i32.eq
                        (get_local $27)
                        (i32.const 9)
                       )
                      )
                      (br_if $label$32
                       (i32.ne
                        (get_local $27)
                        (i32.const 24)
                       )
                      )
                     )
                     (set_local $22
                      (i32.const 2)
                     )
                    )
                    (i32.store16
                     (i32.add
                      (i32.shl
                       (get_local $26)
                       (i32.const 1)
                      )
                      (i32.const 221112)
                     )
                     (get_local $24)
                    )
                    (set_local $26
                     (i32.add
                      (get_local $26)
                      (i32.const 1)
                     )
                    )
                    (set_local $8
                     (i32.add
                      (get_local $22)
                      (i32.and
                       (get_local $8)
                       (i32.const 255)
                      )
                     )
                    )
                   )
                   (set_local $22
                    (i32.const 1)
                   )
                   (block $label$35
                    (block $label$36
                     (br_if $label$36
                      (i32.eq
                       (tee_local $27
                        (i32.and
                         (tee_local $24
                          (call $_Z12testLineFourhhcPc
                           (get_local $6)
                           (i32.const 2)
                           (get_local $1)
                           (get_local $0)
                          )
                         )
                         (i32.const 31)
                        )
                       )
                       (i32.const 8)
                      )
                     )
                     (block $label$37
                      (br_if $label$37
                       (i32.eq
                        (get_local $27)
                        (i32.const 24)
                       )
                      )
                      (br_if $label$35
                       (i32.ne
                        (get_local $27)
                        (i32.const 9)
                       )
                      )
                     )
                     (set_local $22
                      (i32.const 2)
                     )
                    )
                    (i32.store16
                     (i32.add
                      (i32.shl
                       (i32.and
                        (get_local $26)
                        (i32.const 255)
                       )
                       (i32.const 1)
                      )
                      (i32.const 221112)
                     )
                     (get_local $24)
                    )
                    (set_local $26
                     (i32.add
                      (get_local $26)
                      (i32.const 1)
                     )
                    )
                    (set_local $8
                     (i32.add
                      (get_local $22)
                      (i32.and
                       (get_local $8)
                       (i32.const 255)
                      )
                     )
                    )
                   )
                   (set_local $22
                    (i32.const 1)
                   )
                   (block $label$38
                    (block $label$39
                     (br_if $label$39
                      (i32.eq
                       (tee_local $27
                        (i32.and
                         (tee_local $24
                          (call $_Z12testLineFourhhcPc
                           (get_local $6)
                           (i32.const 3)
                           (get_local $1)
                           (get_local $0)
                          )
                         )
                         (i32.const 31)
                        )
                       )
                       (i32.const 8)
                      )
                     )
                     (block $label$40
                      (br_if $label$40
                       (i32.eq
                        (get_local $27)
                        (i32.const 24)
                       )
                      )
                      (br_if $label$38
                       (i32.ne
                        (get_local $27)
                        (i32.const 9)
                       )
                      )
                     )
                     (set_local $22
                      (i32.const 2)
                     )
                    )
                    (i32.store16
                     (i32.add
                      (i32.shl
                       (i32.and
                        (get_local $26)
                        (i32.const 255)
                       )
                       (i32.const 1)
                      )
                      (i32.const 221112)
                     )
                     (get_local $24)
                    )
                    (set_local $26
                     (i32.add
                      (get_local $26)
                      (i32.const 1)
                     )
                    )
                    (set_local $8
                     (i32.add
                      (get_local $22)
                      (i32.and
                       (get_local $8)
                       (i32.const 255)
                      )
                     )
                    )
                   )
                   (br_if $label$18
                    (i32.ne
                     (i32.and
                      (get_local $8)
                      (i32.const 255)
                     )
                     (i32.const 1)
                    )
                   )
                   (set_local $27
                    (i32.const 0)
                   )
                   (i32.store8
                    (i32.add
                     (tee_local $26
                      (call $_Z17getBlockFourPointhPct
                       (get_local $6)
                       (get_local $0)
                       (i32.load16_u offset=221112
                        (i32.const 0)
                       )
                      )
                     )
                     (i32.const 220884)
                    )
                    (i32.const 1)
                   )
                   (i32.store8
                    (tee_local $24
                     (i32.add
                      (get_local $0)
                      (get_local $26)
                     )
                    )
                    (i32.const 1)
                   )
                   (br_if $label$10
                    (i32.gt_u
                     (tee_local $8
                      (i32.add
                       (i32.and
                        (tee_local $25
                         (call $_Z12testLineFourhhcPc
                          (get_local $26)
                          (i32.const 0)
                          (i32.const 1)
                          (get_local $0)
                         )
                        )
                        (i32.const 31)
                       )
                       (i32.const -8)
                      )
                     )
                     (i32.const 20)
                    )
                   )
                   (set_local $22
                    (i32.const 0)
                   )
                   (block $label$41
                    (block $label$42
                     (br_table $label$42 $label$41 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$9 $label$15 $label$9 $label$9 $label$9 $label$14 $label$42
                      (get_local $8)
                     )
                    )
                    (i32.store16 offset=221120
                     (i32.const 0)
                     (get_local $25)
                    )
                    (set_local $27
                     (i32.const 1)
                    )
                   )
                   (set_local $22
                    (i32.const 1)
                   )
                   (br $label$9)
                  )
                  (br_if $label$3
                   (i32.ne
                    (i32.and
                     (get_local $8)
                     (i32.const 255)
                    )
                    (i32.const 2)
                   )
                  )
                  (set_local $22
                   (i32.load16_u offset=221112
                    (i32.const 0)
                   )
                  )
                  (br_if $label$16
                   (i32.ne
                    (i32.and
                     (get_local $26)
                     (i32.const 255)
                    )
                    (i32.const 1)
                   )
                  )
                  (block $label$43
                   (block $label$44
                    (br_if $label$44
                     (i32.eqz
                      (i32.load8_u
                       (i32.add
                        (get_local $0)
                        (tee_local $22
                         (i32.load8_u
                          (i32.add
                           (tee_local $27
                            (i32.add
                             (i32.mul
                              (get_local $6)
                              (i32.const 116)
                             )
                             (tee_local $26
                              (i32.or
                               (tee_local $24
                                (i32.shr_u
                                 (get_local $22)
                                 (i32.const 12)
                                )
                               )
                               (i32.const 56)
                              )
                             )
                            )
                           )
                           (i32.const 70588)
                          )
                         )
                        )
                       )
                      )
                     )
                    )
                    (br_if $label$44
                     (i32.eqz
                      (i32.load8_u
                       (i32.add
                        (get_local $0)
                        (tee_local $22
                         (i32.load8_u
                          (i32.add
                           (get_local $27)
                           (i32.const 70584)
                          )
                         )
                        )
                       )
                      )
                     )
                    )
                    (br_if $label$44
                     (i32.eqz
                      (i32.load8_u
                       (i32.add
                        (get_local $0)
                        (tee_local $22
                         (i32.load8_u
                          (i32.add
                           (tee_local $27
                            (i32.add
                             (i32.mul
                              (get_local $6)
                              (i32.const 116)
                             )
                             (get_local $26)
                            )
                           )
                           (i32.const 70580)
                          )
                         )
                        )
                       )
                      )
                     )
                    )
                    (br_if $label$43
                     (i32.load8_u
                      (i32.add
                       (get_local $0)
                       (tee_local $22
                        (i32.load8_u
                         (i32.add
                          (get_local $27)
                          (i32.const 70576)
                         )
                        )
                       )
                      )
                     )
                    )
                   )
                   (i32.store8
                    (i32.add
                     (get_local $22)
                     (i32.const 220884)
                    )
                    (i32.const 1)
                   )
                   (i32.store8 offset=221608
                    (i32.const 0)
                    (get_local $22)
                   )
                  )
                  (block $label$45
                   (block $label$46
                    (br_if $label$46
                     (i32.eqz
                      (i32.load8_u
                       (i32.add
                        (get_local $0)
                        (tee_local $22
                         (i32.load8_u
                          (i32.add
                           (tee_local $27
                            (i32.add
                             (i32.mul
                              (get_local $6)
                              (i32.const 116)
                             )
                             (get_local $26)
                            )
                           )
                           (i32.const 70596)
                          )
                         )
                        )
                       )
                      )
                     )
                    )
                    (br_if $label$46
                     (i32.eqz
                      (i32.load8_u
                       (i32.add
                        (get_local $0)
                        (tee_local $22
                         (i32.load8_u
                          (i32.add
                           (get_local $27)
                           (i32.const 70600)
                          )
                         )
                        )
                       )
                      )
                     )
                    )
                    (br_if $label$46
                     (i32.eqz
                      (i32.load8_u
                       (i32.add
                        (get_local $0)
                        (tee_local $22
                         (i32.load8_u
                          (i32.add
                           (tee_local $26
                            (i32.add
                             (i32.mul
                              (get_local $6)
                              (i32.const 116)
                             )
                             (get_local $26)
                            )
                           )
                           (i32.const 70604)
                          )
                         )
                        )
                       )
                      )
                     )
                    )
                    (br_if $label$45
                     (i32.load8_u
                      (i32.add
                       (get_local $0)
                       (tee_local $22
                        (i32.load8_u
                         (i32.add
                          (get_local $26)
                          (i32.const 70608)
                         )
                        )
                       )
                      )
                     )
                    )
                   )
                   (i32.store8
                    (i32.add
                     (get_local $22)
                     (i32.const 220884)
                    )
                    (i32.const 1)
                   )
                   (i32.store8 offset=221609
                    (i32.const 0)
                    (get_local $22)
                   )
                  )
                  (br_if $label$3
                   (i32.ne
                    (i32.and
                     (i32.load16_u offset=221112
                      (i32.const 0)
                     )
                     (i32.const 31)
                    )
                    (i32.const 9)
                   )
                  )
                  (set_local $26
                   (i32.and
                    (get_local $24)
                    (i32.const 7)
                   )
                  )
                  (i32.store8
                   (tee_local $27
                    (i32.add
                     (get_local $0)
                     (get_local $6)
                    )
                   )
                   (i32.const 0)
                  )
                  (set_local $24
                   (i32.add
                    (get_local $0)
                    (i32.load8_u offset=221608
                     (i32.const 0)
                    )
                   )
                  )
                  (set_local $22
                   (i32.const 1)
                  )
                  (br_if $label$13
                   (i32.ne
                    (get_local $1)
                    (i32.const 1)
                   )
                  )
                  (set_local $22
                   (i32.const 1)
                  )
                  (i32.store8
                   (get_local $24)
                   (i32.const 1)
                  )
                  (block $label$47
                   (br_if $label$47
                    (i32.ne
                     (i32.and
                      (call $_Z12testLineFourhhcPc
                       (tee_local $8
                        (i32.load8_u offset=221608
                         (i32.const 0)
                        )
                       )
                       (tee_local $25
                        (i32.and
                         (get_local $26)
                         (i32.const 255)
                        )
                       )
                       (i32.const 1)
                       (get_local $0)
                      )
                      (i32.const 31)
                     )
                     (i32.const 9)
                    )
                   )
                   (set_local $24
                    (i32.const 221608)
                   )
                   (br_if $label$12
                    (i32.ne
                     (i32.load8_u offset=32
                      (i32.const 0)
                     )
                     (i32.const 2)
                    )
                   )
                   (br_if $label$12
                    (i32.eqz
                     (call $_Z6isFoulhPc
                      (get_local $8)
                      (get_local $0)
                     )
                    )
                   )
                   (set_local $8
                    (i32.load8_u offset=221608
                     (i32.const 0)
                    )
                   )
                  )
                  (i32.store8
                   (i32.add
                    (get_local $0)
                    (i32.and
                     (get_local $8)
                     (i32.const 255)
                    )
                   )
                   (i32.const 0)
                  )
                  (i32.store8
                   (i32.add
                    (get_local $0)
                    (i32.load8_u offset=221609
                     (i32.const 0)
                    )
                   )
                   (i32.const 1)
                  )
                  (br_if $label$11
                   (i32.ne
                    (i32.and
                     (call $_Z12testLineFourhhcPc
                      (tee_local $26
                       (i32.load8_u offset=221609
                        (i32.const 0)
                       )
                      )
                      (get_local $25)
                      (i32.const 1)
                      (get_local $0)
                     )
                     (i32.const 31)
                    )
                    (i32.const 9)
                   )
                  )
                  (set_local $22
                   (i32.const 0)
                  )
                  (set_local $24
                   (i32.const 221609)
                  )
                  (br_if $label$12
                   (i32.ne
                    (i32.load8_u offset=32
                     (i32.const 0)
                    )
                    (i32.const 2)
                   )
                  )
                  (br_if $label$12
                   (i32.eqz
                    (call $_Z6isFoulhPc
                     (get_local $26)
                     (get_local $0)
                    )
                   )
                  )
                  (set_local $26
                   (i32.load8_u offset=221609
                    (i32.const 0)
                   )
                  )
                  (br $label$11)
                 )
                 (set_local $23
                  (i32.const 0)
                 )
                 (br $label$3)
                )
                (i32.store8
                 (i32.add
                  (call $_Z17getBlockFourPointhPct
                   (get_local $6)
                   (get_local $0)
                   (get_local $22)
                  )
                  (i32.const 220884)
                 )
                 (i32.const 1)
                )
                (i32.store8
                 (i32.add
                  (call $_Z17getBlockFourPointhPct
                   (get_local $6)
                   (get_local $0)
                   (i32.load16_u offset=221114
                    (i32.const 0)
                   )
                  )
                  (i32.const 220884)
                 )
                 (i32.const 1)
                )
                (br $label$3)
               )
               (i32.store16 offset=221120
                (i32.const 0)
                (get_local $25)
               )
               (set_local $22
                (i32.const 2)
               )
               (set_local $27
                (i32.const 1)
               )
               (br $label$9)
              )
              (set_local $22
               (i32.const 3)
              )
              (br $label$9)
             )
             (i32.store8
              (get_local $24)
              (get_local $1)
             )
             (set_local $24
              (i32.const 221608)
             )
             (br_if $label$12
              (i32.eq
               (i32.and
                (call $_Z12testLineFourhhcPc
                 (tee_local $8
                  (i32.load8_u offset=221608
                   (i32.const 0)
                  )
                 )
                 (tee_local $25
                  (i32.and
                   (get_local $26)
                   (i32.const 255)
                  )
                 )
                 (get_local $1)
                 (get_local $0)
                )
                (i32.const 31)
               )
               (i32.const 9)
              )
             )
             (i32.store8
              (i32.add
               (get_local $0)
               (get_local $8)
              )
              (i32.const 0)
             )
             (i32.store8
              (i32.add
               (get_local $0)
               (i32.load8_u offset=221609
                (i32.const 0)
               )
              )
              (get_local $1)
             )
             (set_local $24
              (i32.const 221609)
             )
             (set_local $22
              (i32.const 0)
             )
             (br_if $label$11
              (i32.ne
               (i32.and
                (call $_Z12testLineFourhhcPc
                 (tee_local $26
                  (i32.load8_u offset=221609
                   (i32.const 0)
                  )
                 )
                 (get_local $25)
                 (get_local $1)
                 (get_local $0)
                )
                (i32.const 31)
               )
               (i32.const 9)
              )
             )
            )
            (i32.store8
             (i32.add
              (i32.load8_u
               (i32.add
                (get_local $22)
                (i32.const 221608)
               )
              )
              (i32.const 220884)
             )
             (i32.const 0)
            )
            (set_local $26
             (i32.load8_u
              (get_local $24)
             )
            )
           )
           (i32.store8
            (i32.add
             (get_local $0)
             (i32.and
              (get_local $26)
              (i32.const 255)
             )
            )
            (i32.const 0)
           )
           (i32.store8
            (get_local $27)
            (get_local $1)
           )
           (br $label$3)
          )
          (set_local $22
           (i32.const 0)
          )
         )
         (block $label$48
          (br_if $label$48
           (i32.gt_u
            (tee_local $8
             (i32.add
              (i32.and
               (tee_local $25
                (call $_Z12testLineFourhhcPc
                 (get_local $26)
                 (i32.const 1)
                 (i32.const 1)
                 (get_local $0)
                )
               )
               (i32.const 31)
              )
              (i32.const -8)
             )
            )
            (i32.const 20)
           )
          )
          (block $label$49
           (block $label$50
            (block $label$51
             (block $label$52
              (br_table $label$52 $label$51 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$48 $label$50 $label$48 $label$48 $label$48 $label$49 $label$52
               (get_local $8)
              )
             )
             (i32.store16
              (i32.add
               (i32.shl
                (get_local $27)
                (i32.const 1)
               )
               (i32.const 221120)
              )
              (get_local $25)
             )
             (set_local $27
              (i32.add
               (get_local $27)
               (i32.const 1)
              )
             )
             (set_local $22
              (i32.add
               (get_local $22)
               (i32.const 1)
              )
             )
             (br $label$48)
            )
            (set_local $22
             (i32.add
              (get_local $22)
              (i32.const 1)
             )
            )
            (br $label$48)
           )
           (i32.store16
            (i32.add
             (i32.shl
              (get_local $27)
              (i32.const 1)
             )
             (i32.const 221120)
            )
            (get_local $25)
           )
           (set_local $27
            (i32.add
             (get_local $27)
             (i32.const 1)
            )
           )
           (set_local $22
            (i32.add
             (get_local $22)
             (i32.const 2)
            )
           )
           (br $label$48)
          )
          (set_local $22
           (i32.add
            (get_local $22)
            (i32.const 3)
           )
          )
         )
         (block $label$53
          (br_if $label$53
           (i32.gt_u
            (tee_local $8
             (i32.add
              (i32.and
               (tee_local $25
                (call $_Z12testLineFourhhcPc
                 (get_local $26)
                 (i32.const 2)
                 (i32.const 1)
                 (get_local $0)
                )
               )
               (i32.const 31)
              )
              (i32.const -8)
             )
            )
            (i32.const 20)
           )
          )
          (block $label$54
           (block $label$55
            (block $label$56
             (block $label$57
              (br_table $label$57 $label$56 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$53 $label$55 $label$53 $label$53 $label$53 $label$54 $label$57
               (get_local $8)
              )
             )
             (i32.store16
              (i32.add
               (i32.shl
                (i32.and
                 (get_local $27)
                 (i32.const 255)
                )
                (i32.const 1)
               )
               (i32.const 221120)
              )
              (get_local $25)
             )
             (set_local $27
              (i32.add
               (get_local $27)
               (i32.const 1)
              )
             )
             (set_local $22
              (i32.add
               (i32.and
                (get_local $22)
                (i32.const 255)
               )
               (i32.const 1)
              )
             )
             (br $label$53)
            )
            (set_local $22
             (i32.add
              (i32.and
               (get_local $22)
               (i32.const 255)
              )
              (i32.const 1)
             )
            )
            (br $label$53)
           )
           (i32.store16
            (i32.add
             (i32.shl
              (i32.and
               (get_local $27)
               (i32.const 255)
              )
              (i32.const 1)
             )
             (i32.const 221120)
            )
            (get_local $25)
           )
           (set_local $27
            (i32.add
             (get_local $27)
             (i32.const 1)
            )
           )
           (set_local $22
            (i32.add
             (i32.and
              (get_local $22)
              (i32.const 255)
             )
             (i32.const 2)
            )
           )
           (br $label$53)
          )
          (set_local $22
           (i32.add
            (i32.and
             (get_local $22)
             (i32.const 255)
            )
            (i32.const 3)
           )
          )
         )
         (block $label$58
          (br_if $label$58
           (i32.gt_u
            (tee_local $26
             (i32.add
              (i32.and
               (tee_local $8
                (call $_Z12testLineFourhhcPc
                 (get_local $26)
                 (i32.const 3)
                 (i32.const 1)
                 (get_local $0)
                )
               )
               (i32.const 31)
              )
              (i32.const -8)
             )
            )
            (i32.const 20)
           )
          )
          (block $label$59
           (block $label$60
            (br_table $label$60 $label$59 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$58 $label$7 $label$58 $label$58 $label$58 $label$6 $label$60
             (get_local $26)
            )
           )
           (i32.store16
            (i32.add
             (i32.shl
              (i32.and
               (get_local $27)
               (i32.const 255)
              )
              (i32.const 1)
             )
             (i32.const 221120)
            )
            (get_local $8)
           )
           (set_local $27
            (i32.add
             (get_local $27)
             (i32.const 1)
            )
           )
           (set_local $22
            (i32.add
             (i32.and
              (get_local $22)
              (i32.const 255)
             )
             (i32.const 1)
            )
           )
           (br $label$58)
          )
          (set_local $22
           (i32.add
            (i32.and
             (get_local $22)
             (i32.const 255)
            )
            (i32.const 1)
           )
          )
         )
         (i32.store8
          (get_local $24)
          (i32.const 0)
         )
         (br_if $label$4
          (i32.gt_u
           (i32.and
            (get_local $22)
            (i32.const 255)
           )
           (i32.const 1)
          )
         )
        )
        (block $label$61
         (br_if $label$61
          (i32.eqz
           (tee_local $26
            (i32.and
             (get_local $23)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $22
          (get_local $2)
         )
         (loop $label$62
          (i32.store8
           (i32.add
            (get_local $0)
            (i32.load8_u
             (get_local $22)
            )
           )
           (i32.const 0)
          )
          (set_local $22
           (i32.add
            (get_local $22)
            (i32.const 1)
           )
          )
          (br_if $label$62
           (tee_local $26
            (i32.add
             (get_local $26)
             (i32.const -1)
            )
           )
          )
         )
        )
        (block $label$63
         (br_if $label$63
          (i32.eqz
           (get_local $4)
          )
         )
         (set_local $27
          (i32.ne
           (get_local $1)
           (i32.const 2)
          )
         )
         (set_local $22
          (i32.const 0)
         )
         (loop $label$64
          (block $label$65
           (br_if $label$65
            (i32.load8_u
             (tee_local $26
              (i32.add
               (get_local $0)
               (get_local $22)
              )
             )
            )
           )
           (block $label$66
            (br_if $label$66
             (get_local $27)
            )
            (br_if $label$66
             (i32.ne
              (i32.and
               (i32.load8_u offset=32
                (i32.const 0)
               )
               (i32.const 255)
              )
              (i32.const 2)
             )
            )
            (br_if $label$65
             (call $_Z6isFoulhPc
              (i32.and
               (get_local $22)
               (i32.const 255)
              )
              (get_local $0)
             )
            )
           )
           (i32.store8
            (get_local $26)
            (get_local $7)
           )
           (block $label$67
            (br_if $label$67
             (call $_Z5isVCFcPcPhh
              (get_local $1)
              (get_local $0)
              (get_local $2)
              (get_local $3)
             )
            )
            (i32.store8 offset=220656
             (i32.const 0)
             (tee_local $24
              (i32.add
               (i32.load8_u offset=220656
                (i32.const 0)
               )
               (i32.const 1)
              )
             )
            )
            (i32.store8
             (i32.add
              (i32.and
               (get_local $24)
               (i32.const 255)
              )
              (i32.const 220656)
             )
             (get_local $22)
            )
           )
           (i32.store8
            (get_local $26)
            (i32.const 0)
           )
          )
          (br_if $label$64
           (i32.ne
            (tee_local $22
             (i32.add
              (get_local $22)
              (i32.const 1)
             )
            )
            (i32.const 225)
           )
          )
          (br $label$2)
         )
        )
        (block $label$68
         (br_if $label$68
          (i32.ne
           (get_local $1)
           (i32.const 2)
          )
         )
         (set_local $22
          (i32.const 221152)
         )
         (set_local $26
          (i32.const 0)
         )
         (loop $label$69
          (block $label$70
           (br_if $label$70
            (i32.eq
             (i32.and
              (i32.load16_u
               (get_local $22)
              )
              (i32.const 30)
             )
             (i32.const 8)
            )
           )
           (br_if $label$70
            (i32.load8_u
             (tee_local $27
              (i32.add
               (get_local $0)
               (get_local $26)
              )
             )
            )
           )
           (block $label$71
            (br_if $label$71
             (i32.ne
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 2)
             )
            )
            (br_if $label$70
             (call $_Z6isFoulhPc
              (i32.and
               (get_local $26)
               (i32.const 255)
              )
              (get_local $0)
             )
            )
           )
           (i32.store8
            (get_local $27)
            (get_local $7)
           )
           (block $label$72
            (br_if $label$72
             (call $_Z5isVCFcPcPhh
              (i32.const 2)
              (get_local $0)
              (get_local $2)
              (get_local $3)
             )
            )
            (i32.store8 offset=220656
             (i32.const 0)
             (tee_local $24
              (i32.add
               (i32.load8_u offset=220656
                (i32.const 0)
               )
               (i32.const 1)
              )
             )
            )
            (i32.store8
             (i32.add
              (i32.and
               (get_local $24)
               (i32.const 255)
              )
              (i32.const 220656)
             )
             (get_local $26)
            )
           )
           (i32.store8
            (get_local $27)
            (i32.const 0)
           )
          )
          (set_local $22
           (i32.add
            (get_local $22)
            (i32.const 2)
           )
          )
          (br_if $label$69
           (i32.ne
            (tee_local $26
             (i32.add
              (get_local $26)
              (i32.const 1)
             )
            )
            (i32.const 225)
           )
          )
          (br $label$2)
         )
        )
        (set_local $22
         (i32.const 221152)
        )
        (set_local $26
         (i32.const 0)
        )
        (loop $label$73
         (block $label$74
          (br_if $label$74
           (i32.eq
            (i32.and
             (i32.load16_u
              (get_local $22)
             )
             (i32.const 30)
            )
            (i32.const 8)
           )
          )
          (br_if $label$74
           (i32.load8_u
            (tee_local $27
             (i32.add
              (get_local $0)
              (get_local $26)
             )
            )
           )
          )
          (i32.store8
           (get_local $27)
           (get_local $7)
          )
          (block $label$75
           (br_if $label$75
            (call $_Z5isVCFcPcPhh
             (get_local $1)
             (get_local $0)
             (get_local $2)
             (get_local $3)
            )
           )
           (i32.store8 offset=220656
            (i32.const 0)
            (tee_local $24
             (i32.add
              (i32.load8_u offset=220656
               (i32.const 0)
              )
              (i32.const 1)
             )
            )
           )
           (i32.store8
            (i32.add
             (i32.and
              (get_local $24)
              (i32.const 255)
             )
             (i32.const 220656)
            )
            (get_local $26)
           )
          )
          (i32.store8
           (get_local $27)
           (i32.const 0)
          )
         )
         (set_local $22
          (i32.add
           (get_local $22)
           (i32.const 2)
          )
         )
         (br_if $label$73
          (i32.ne
           (tee_local $26
            (i32.add
             (get_local $26)
             (i32.const 1)
            )
           )
           (i32.const 225)
          )
         )
         (br $label$2)
        )
       )
       (i32.store16
        (i32.add
         (i32.shl
          (i32.and
           (get_local $27)
           (i32.const 255)
          )
          (i32.const 1)
         )
         (i32.const 221120)
        )
        (get_local $8)
       )
       (set_local $27
        (i32.add
         (get_local $27)
         (i32.const 1)
        )
       )
       (set_local $22
        (i32.add
         (i32.and
          (get_local $22)
          (i32.const 255)
         )
         (i32.const 2)
        )
       )
       (br $label$5)
      )
      (set_local $22
       (i32.add
        (i32.and
         (get_local $22)
         (i32.const 255)
        )
        (i32.const 3)
       )
      )
     )
     (i32.store8
      (get_local $24)
      (i32.const 0)
     )
    )
    (br_if $label$3
     (i32.ne
      (i32.and
       (get_local $22)
       (i32.const 255)
      )
      (i32.const 2)
     )
    )
    (set_local $6
     (call $_Z17getBlockFourPointhPct
      (get_local $6)
      (get_local $0)
      (i32.load16_u offset=221112
       (i32.const 0)
      )
     )
    )
    (br_if $label$3
     (i32.eqz
      (i32.and
       (get_local $27)
       (i32.const 255)
      )
     )
    )
    (set_local $25
     (i32.and
      (get_local $27)
      (i32.const 255)
     )
    )
    (set_local $21
     (i32.add
      (tee_local $22
       (i32.mul
        (get_local $6)
        (i32.const 116)
       )
      )
      (i32.const 20)
     )
    )
    (set_local $20
     (i32.add
      (get_local $22)
      (i32.const 16)
     )
    )
    (set_local $19
     (i32.add
      (get_local $22)
      (i32.const 12)
     )
    )
    (set_local $18
     (i32.add
      (get_local $22)
      (i32.const 8)
     )
    )
    (set_local $17
     (i32.add
      (get_local $22)
      (i32.const 4)
     )
    )
    (set_local $16
     (i32.add
      (get_local $22)
      (i32.const -20)
     )
    )
    (set_local $15
     (i32.add
      (get_local $22)
      (i32.const -16)
     )
    )
    (set_local $14
     (i32.add
      (get_local $22)
      (i32.const -12)
     )
    )
    (set_local $13
     (i32.add
      (get_local $22)
      (i32.const -8)
     )
    )
    (set_local $12
     (i32.add
      (get_local $22)
      (i32.const -4)
     )
    )
    (set_local $27
     (i32.const 221120)
    )
    (loop $label$76
     (set_local $22
      (i32.add
       (get_local $0)
       (call $_Z17getBlockFourPointhPct
        (get_local $6)
        (get_local $0)
        (tee_local $26
         (i32.load16_u
          (get_local $27)
         )
        )
       )
      )
     )
     (set_local $8
      (i32.shr_u
       (get_local $26)
       (i32.const 12)
      )
     )
     (block $label$77
      (br_if $label$77
       (tee_local $24
        (i32.eq
         (i32.and
          (get_local $26)
          (i32.const 31)
         )
         (i32.const 24)
        )
       )
      )
      (i32.store8
       (get_local $22)
       (i32.const 1)
      )
     )
     (set_local $10
      (select
       (i32.const -1)
       (i32.const 0)
       (get_local $24)
      )
     )
     (block $label$78
      (br_if $label$78
       (i32.eq
        (tee_local $8
         (i32.load8_s
          (tee_local $11
           (i32.add
            (get_local $0)
            (tee_local $9
             (i32.load8_u
              (i32.add
               (i32.add
                (get_local $12)
                (tee_local $26
                 (i32.or
                  (get_local $8)
                  (i32.const 56)
                 )
                )
               )
               (i32.const 70592)
              )
             )
            )
           )
          )
         )
        )
        (i32.const -1)
       )
      )
      (br_if $label$78
       (i32.eq
        (get_local $8)
        (i32.const 2)
       )
      )
      (set_local $28
       (get_local $10)
      )
      (block $label$79
       (block $label$80
        (br_if $label$80
         (get_local $8)
        )
        (set_local $28
         (i32.const 0)
        )
        (br_if $label$79
         (i32.eqz
          (get_local $24)
         )
        )
       )
       (br_if $label$78
        (i32.eq
         (tee_local $8
          (i32.load8_s
           (tee_local $11
            (i32.add
             (get_local $0)
             (tee_local $9
              (i32.load8_u
               (i32.add
                (i32.add
                 (get_local $13)
                 (get_local $26)
                )
                (i32.const 70592)
               )
              )
             )
            )
           )
          )
         )
         (i32.const -1)
        )
       )
       (block $label$81
        (block $label$82
         (br_if $label$82
          (i32.eqz
           (get_local $8)
          )
         )
         (br_if $label$81
          (i32.ne
           (get_local $8)
           (i32.const 2)
          )
         )
         (br $label$78)
        )
        (br_if $label$79
         (i32.ne
          (get_local $28)
          (i32.const -1)
         )
        )
        (set_local $28
         (i32.const 0)
        )
       )
       (br_if $label$78
        (i32.eq
         (tee_local $8
          (i32.load8_s
           (tee_local $11
            (i32.add
             (get_local $0)
             (tee_local $9
              (i32.load8_u
               (i32.add
                (i32.add
                 (get_local $14)
                 (get_local $26)
                )
                (i32.const 70592)
               )
              )
             )
            )
           )
          )
         )
         (i32.const -1)
        )
       )
       (br_if $label$78
        (i32.eq
         (get_local $8)
         (i32.const 2)
        )
       )
       (block $label$83
        (br_if $label$83
         (get_local $8)
        )
        (br_if $label$79
         (i32.ne
          (get_local $28)
          (i32.const -1)
         )
        )
        (set_local $28
         (i32.const 0)
        )
       )
       (br_if $label$78
        (i32.eq
         (tee_local $8
          (i32.load8_s
           (tee_local $11
            (i32.add
             (get_local $0)
             (tee_local $9
              (i32.load8_u
               (i32.add
                (i32.add
                 (get_local $15)
                 (get_local $26)
                )
                (i32.const 70592)
               )
              )
             )
            )
           )
          )
         )
         (i32.const -1)
        )
       )
       (br_if $label$78
        (i32.eq
         (get_local $8)
         (i32.const 2)
        )
       )
       (block $label$84
        (br_if $label$84
         (get_local $8)
        )
        (br_if $label$79
         (i32.ne
          (get_local $28)
          (i32.const -1)
         )
        )
        (set_local $28
         (i32.const 0)
        )
       )
       (br_if $label$78
        (i32.load8_s
         (tee_local $11
          (i32.add
           (get_local $0)
           (tee_local $9
            (i32.load8_u
             (i32.add
              (i32.add
               (get_local $16)
               (get_local $26)
              )
              (i32.const 70592)
             )
            )
           )
          )
         )
        )
       )
       (br_if $label$78
        (i32.eq
         (get_local $28)
         (i32.const -1)
        )
       )
      )
      (set_local $8
       (i32.load8_u
        (get_local $22)
       )
      )
      (i32.store8
       (get_local $22)
       (i32.const 0)
      )
      (i32.store8
       (get_local $11)
       (i32.const 1)
      )
      (block $label$85
       (br_if $label$85
        (call $_Z6isFoulhPc
         (get_local $6)
         (get_local $0)
        )
       )
       (i32.store8
        (i32.add
         (get_local $9)
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (get_local $11)
       (i32.const 0)
      )
      (i32.store8
       (get_local $22)
       (get_local $8)
      )
     )
     (block $label$86
      (br_if $label$86
       (i32.eq
        (tee_local $8
         (i32.load8_s
          (tee_local $11
           (i32.add
            (get_local $0)
            (tee_local $9
             (i32.load8_u
              (i32.add
               (i32.add
                (get_local $17)
                (get_local $26)
               )
               (i32.const 70592)
              )
             )
            )
           )
          )
         )
        )
        (i32.const -1)
       )
      )
      (br_if $label$86
       (i32.eq
        (get_local $8)
        (i32.const 2)
       )
      )
      (block $label$87
       (block $label$88
        (br_if $label$88
         (get_local $8)
        )
        (set_local $10
         (i32.const 0)
        )
        (br_if $label$87
         (i32.eqz
          (get_local $24)
         )
        )
       )
       (br_if $label$86
        (i32.eq
         (tee_local $24
          (i32.load8_s
           (tee_local $11
            (i32.add
             (get_local $0)
             (tee_local $9
              (i32.load8_u
               (i32.add
                (i32.add
                 (get_local $18)
                 (get_local $26)
                )
                (i32.const 70592)
               )
              )
             )
            )
           )
          )
         )
         (i32.const 2)
        )
       )
       (block $label$89
        (block $label$90
         (br_if $label$90
          (i32.eqz
           (get_local $24)
          )
         )
         (br_if $label$89
          (i32.ne
           (get_local $24)
           (i32.const -1)
          )
         )
         (br $label$86)
        )
        (br_if $label$87
         (i32.ne
          (get_local $10)
          (i32.const -1)
         )
        )
        (set_local $10
         (i32.const 0)
        )
       )
       (br_if $label$86
        (i32.eq
         (tee_local $24
          (i32.load8_s
           (tee_local $11
            (i32.add
             (get_local $0)
             (tee_local $9
              (i32.load8_u
               (i32.add
                (i32.add
                 (get_local $19)
                 (get_local $26)
                )
                (i32.const 70592)
               )
              )
             )
            )
           )
          )
         )
         (i32.const -1)
        )
       )
       (br_if $label$86
        (i32.eq
         (get_local $24)
         (i32.const 2)
        )
       )
       (block $label$91
        (br_if $label$91
         (get_local $24)
        )
        (br_if $label$87
         (i32.ne
          (get_local $10)
          (i32.const -1)
         )
        )
        (set_local $10
         (i32.const 0)
        )
       )
       (br_if $label$86
        (i32.eq
         (tee_local $24
          (i32.load8_s
           (tee_local $11
            (i32.add
             (get_local $0)
             (tee_local $9
              (i32.load8_u
               (i32.add
                (i32.add
                 (get_local $20)
                 (get_local $26)
                )
                (i32.const 70592)
               )
              )
             )
            )
           )
          )
         )
         (i32.const -1)
        )
       )
       (br_if $label$86
        (i32.eq
         (get_local $24)
         (i32.const 2)
        )
       )
       (block $label$92
        (br_if $label$92
         (get_local $24)
        )
        (br_if $label$87
         (i32.ne
          (get_local $10)
          (i32.const -1)
         )
        )
        (set_local $10
         (i32.const 0)
        )
       )
       (br_if $label$86
        (i32.load8_s
         (tee_local $11
          (i32.add
           (get_local $0)
           (tee_local $9
            (i32.load8_u
             (i32.add
              (i32.add
               (get_local $21)
               (get_local $26)
              )
              (i32.const 70592)
             )
            )
           )
          )
         )
        )
       )
       (br_if $label$86
        (i32.eq
         (get_local $10)
         (i32.const -1)
        )
       )
      )
      (set_local $26
       (i32.load8_u
        (get_local $22)
       )
      )
      (i32.store8
       (get_local $22)
       (i32.const 0)
      )
      (i32.store8
       (get_local $11)
       (i32.const 1)
      )
      (block $label$93
       (br_if $label$93
        (call $_Z6isFoulhPc
         (get_local $6)
         (get_local $0)
        )
       )
       (i32.store8
        (i32.add
         (get_local $9)
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (get_local $11)
       (i32.const 0)
      )
      (i32.store8
       (get_local $22)
       (get_local $26)
      )
     )
     (i32.store8
      (get_local $22)
      (i32.const 0)
     )
     (set_local $27
      (i32.add
       (get_local $27)
       (i32.const 2)
      )
     )
     (br_if $label$76
      (tee_local $25
       (i32.add
        (get_local $25)
        (i32.const -1)
       )
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $0)
     (i32.load8_u
      (tee_local $22
       (i32.add
        (get_local $2)
        (i32.and
         (tee_local $24
          (i32.add
           (get_local $23)
           (i32.const -1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
    (i32.const 0)
   )
   (i32.store8
    (i32.add
     (i32.load8_u
      (get_local $22)
     )
     (i32.const 220884)
    )
    (i32.const 1)
   )
   (set_local $22
    (i32.const 14)
   )
   (block $label$94
    (br_if $label$94
     (i32.ne
      (get_local $1)
      (i32.const 2)
     )
    )
    (set_local $22
     (select
      (i32.const 30)
      (i32.const 14)
      (i32.eq
       (i32.load8_u offset=32
        (i32.const 0)
       )
       (i32.const 2)
      )
     )
    )
   )
   (block $label$95
    (br_if $label$95
     (i32.lt_u
      (get_local $3)
      (i32.const 2)
     )
    )
    (set_local $23
     (i32.const 0)
    )
    (loop $label$96
     (set_local $27
      (i32.load8_u
       (tee_local $3
        (i32.add
         (get_local $2)
         (i32.and
          (i32.add
           (get_local $24)
           (i32.const -1)
          )
          (i32.const 255)
         )
        )
       )
      )
     )
     (set_local $26
      (i32.const 0)
     )
     (loop $label$97
      (call $_Z17testLinePointFourhhcPcPt
       (i32.and
        (get_local $27)
        (i32.const 255)
       )
       (i32.and
        (get_local $26)
        (i32.const 255)
       )
       (get_local $7)
       (get_local $0)
       (i32.const 221128)
      )
      (block $label$98
       (br_if $label$98
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221128
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70632)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$99
       (br_if $label$99
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221130
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70636)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$100
       (br_if $label$100
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221132
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70640)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$101
       (br_if $label$101
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221134
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70644)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$102
       (br_if $label$102
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221136
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70648)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$103
       (br_if $label$103
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221138
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70652)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$104
       (br_if $label$104
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221140
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70656)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$105
       (br_if $label$105
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221142
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70660)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (block $label$106
       (br_if $label$106
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.load16_u offset=221144
           (i32.const 0)
          )
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $26)
            (i32.mul
             (i32.load8_u
              (get_local $3)
             )
             (i32.const 116)
            )
           )
           (i32.const 70664)
          )
         )
         (i32.const 220884)
        )
        (i32.const 1)
       )
      )
      (set_local $27
       (i32.load8_u
        (get_local $3)
       )
      )
      (br_if $label$97
       (i32.ne
        (tee_local $26
         (i32.add
          (get_local $26)
          (i32.const 1)
         )
        )
        (i32.const 4)
       )
      )
     )
     (i32.store8
      (i32.add
       (get_local $0)
       (get_local $27)
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (i32.load8_u
        (get_local $3)
       )
       (i32.const 220884)
      )
      (i32.const 1)
     )
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.load8_u
        (tee_local $26
         (i32.add
          (get_local $2)
          (i32.and
           (tee_local $24
            (i32.add
             (get_local $24)
             (i32.const -2)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (i32.load8_u
        (get_local $26)
       )
       (i32.const 220884)
      )
      (i32.const 1)
     )
     (br_if $label$96
      (i32.lt_s
       (tee_local $23
        (i32.and
         (i32.add
          (get_local $23)
          (i32.const 2)
         )
         (i32.const 65535)
        )
       )
       (get_local $5)
      )
     )
    )
   )
   (block $label$107
    (br_if $label$107
     (i32.ne
      (get_local $1)
      (i32.const 2)
     )
    )
    (set_local $26
     (i32.const 221152)
    )
    (set_local $22
     (i32.const 0)
    )
    (loop $label$108
     (block $label$109
      (block $label$110
       (block $label$111
        (br_if $label$111
         (i32.ne
          (i32.and
           (i32.load16_u
            (get_local $26)
           )
           (i32.const 30)
          )
          (i32.const 8)
         )
        )
        (i32.store8
         (i32.add
          (get_local $22)
          (i32.const 220884)
         )
         (get_local $4)
        )
        (br_if $label$110
         (i32.and
          (get_local $4)
          (i32.const 255)
         )
        )
        (br $label$109)
       )
       (br_if $label$109
        (i32.eqz
         (i32.and
          (i32.load8_u
           (i32.add
            (get_local $22)
            (i32.const 220884)
           )
          )
          (i32.const 255)
         )
        )
       )
      )
      (block $label$112
       (br_if $label$112
        (i32.ne
         (i32.load8_u offset=32
          (i32.const 0)
         )
         (i32.const 2)
        )
       )
       (br_if $label$109
        (call $_Z6isFoulhPc
         (i32.and
          (get_local $22)
          (i32.const 255)
         )
         (get_local $0)
        )
       )
      )
      (i32.store8 offset=220656
       (i32.const 0)
       (tee_local $3
        (i32.add
         (i32.load8_u offset=220656
          (i32.const 0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store8
       (i32.add
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
        (i32.const 220656)
       )
       (get_local $22)
      )
     )
     (set_local $26
      (i32.add
       (get_local $26)
       (i32.const 2)
      )
     )
     (br_if $label$108
      (i32.ne
       (tee_local $22
        (i32.add
         (get_local $22)
         (i32.const 1)
        )
       )
       (i32.const 225)
      )
     )
     (br $label$2)
    )
   )
   (set_local $26
    (i32.const 221152)
   )
   (set_local $22
    (i32.const 0)
   )
   (loop $label$113
    (block $label$114
     (block $label$115
      (block $label$116
       (br_if $label$116
        (i32.ne
         (i32.and
          (i32.load16_u
           (get_local $26)
          )
          (i32.const 30)
         )
         (i32.const 8)
        )
       )
       (i32.store8
        (i32.add
         (get_local $22)
         (i32.const 220884)
        )
        (get_local $4)
       )
       (br_if $label$115
        (i32.and
         (get_local $4)
         (i32.const 255)
        )
       )
       (br $label$114)
      )
      (br_if $label$114
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $22)
           (i32.const 220884)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (i32.store8 offset=220656
      (i32.const 0)
      (tee_local $3
       (i32.add
        (i32.load8_u offset=220656
         (i32.const 0)
        )
        (i32.const 1)
       )
      )
     )
     (i32.store8
      (i32.add
       (i32.and
        (get_local $3)
        (i32.const 255)
       )
       (i32.const 220656)
      )
      (get_local $22)
     )
    )
    (set_local $26
     (i32.add
      (get_local $26)
      (i32.const 2)
     )
    )
    (br_if $label$113
     (i32.ne
      (tee_local $22
       (i32.add
        (get_local $22)
        (i32.const 1)
       )
      )
      (i32.const 225)
     )
    )
   )
  )
 )
)
