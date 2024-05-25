(module
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$vd (func (param f64)))
 (import "env" "_Z11lz4Callbackj" (func $_Z11lz4Callbackj (param i32)))
 (import "env" "_Z14outputProgressd" (func $_Z14outputProgressd (param f64)))
 (import "env" "_Z7onErrorPc" (func $_Z7onErrorPc (param i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (data (i32.const 2096) "\b1y7\9e")
 (data (i32.const 2100) "w\ca\eb\85")
 (data (i32.const 2104) "=\ae\b2\c2")
 (data (i32.const 2108) "/\eb\d4\'")
 (data (i32.const 2112) "\b1gV\16")
 (data (i32.const 2116) "\04\00\00\00")
 (data (i32.const 2120) "\04\"M\18")
 (data (i32.const 2124) "\04\00\00\00")
 (data (i32.const 2128) "\08\00\00\00")
 (data (i32.const 2132) "\10\00\00\00")
 (data (i32.const 2136) "@\00\00\00")
 (data (i32.const 2140) "\c0\00\00\00")
 (data (i32.const 2144) "\00\00\00\80")
 (data (i32.const 2148) "\04\00\00\00")
 (data (i32.const 2152) "\07\00\00\00")
 (data (i32.const 2160) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\04\00\00\00\10\00\00\00@\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 2224) "incompatible descriptor version\00")
 (data (i32.const 2256) "invalid block size\00")
 (data (i32.const 2276) "\00\00\00\00")
 (data (i32.const 2280) "\00\00\00\00")
 (data (i32.const 2284) "\00\00\00\00")
 (data (i32.const 2288) "\00\00\00\00")
 (data (i32.const 2292) "\00\00\00\00")
 (data (i32.const 2296) "\00\00\00\00")
 (data (i32.const 2300) "\00\00\00\00")
 (data (i32.const 2304) "\00\00\00\00")
 (data (i32.const 2308) "\00\00\00\00")
 (export "memory" (memory $0))
 (export "input" (func $_Z5inputv))
 (export "output" (func $_Z6outputv))
 (export "hash" (func $_Z5xxh32jPhji))
 (export "decompressFrame" (func $_Z15decompressFramePhjS_j))
 (export "init" (func $_Z4initPjjS_jPhj))
 (export "get" (func $_Z3getPh))
 (export "set" (func $_Z3setPhj))
 (export "getMaxLength" (func $_Z12getMaxLengthv))
 (export "nodeBytes" (func $_Z9nodeBytesv))
 (export "nodeSize" (func $_Z8nodeSizev))
 (export "tableSize" (func $_Z9tableSizev))
 (export "tableBytes" (func $_Z10tableBytesv))
 (export "size" (func $_Z7getSizev))
 (export "load" (func $_Z4loadv))
 (func $_Z5inputv (; 3 ;) (result i32)
  (i32.const 48)
 )
 (func $_Z6outputv (; 4 ;) (result i32)
  (i32.const 1072)
 )
 (func $_Z7hashU32i (; 5 ;) (param $0 i32) (result i32)
  (i32.xor
   (i32.xor
    (tee_local $0
     (i32.add
      (i32.add
       (tee_local $0
        (i32.xor
         (i32.add
          (tee_local $0
           (i32.add
            (tee_local $0
             (i32.xor
              (i32.xor
               (tee_local $0
                (i32.add
                 (i32.add
                  (get_local $0)
                  (i32.shl
                   (get_local $0)
                   (i32.const 12)
                  )
                 )
                 (i32.const 2127912214)
                )
               )
               (i32.shr_u
                (get_local $0)
                (i32.const 19)
               )
              )
              (i32.const -949894596)
             )
            )
            (i32.shl
             (get_local $0)
             (i32.const 5)
            )
           )
          )
          (i32.const -369570787)
         )
         (i32.add
          (i32.shl
           (get_local $0)
           (i32.const 9)
          )
          (i32.const -1395695104)
         )
        )
       )
       (i32.shl
        (get_local $0)
        (i32.const 3)
       )
      )
      (i32.const -42973499)
     )
    )
    (i32.shr_u
     (get_local $0)
     (i32.const 16)
    )
   )
   (i32.const -1252372727)
  )
 )
 (func $_Z7readU64Phj (; 6 ;) (param $0 i32) (param $1 i32) (result i64)
  (i64.or
   (i64.or
    (i64.or
     (i64.shl
      (i64.load8_u
       (i32.add
        (tee_local $0
         (i32.add
          (get_local $0)
          (get_local $1)
         )
        )
        (i32.const 1)
       )
      )
      (i64.const 8)
     )
     (i64.load8_u
      (get_local $0)
     )
    )
    (i64.shl
     (i64.load8_u
      (i32.add
       (get_local $0)
       (i32.const 2)
      )
     )
     (i64.const 16)
    )
   )
   (i64.extend_s/i32
    (i32.shl
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 3)
      )
     )
     (i32.const 24)
    )
   )
  )
 )
 (func $_Z7readU32Phj (; 7 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load align=1
   (i32.add
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $_Z4imulii (; 8 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (i32.add
   (i32.shl
    (i32.add
     (i32.mul
      (tee_local $2
       (i32.and
        (get_local $1)
        (i32.const 65535)
       )
      )
      (i32.shr_u
       (get_local $0)
       (i32.const 16)
      )
     )
     (i32.mul
      (i32.shr_u
       (get_local $1)
       (i32.const 16)
      )
      (tee_local $1
       (i32.and
        (get_local $0)
        (i32.const 65535)
       )
      )
     )
    )
    (i32.const 16)
   )
   (i32.mul
    (get_local $2)
    (get_local $1)
   )
  )
 )
 (func $_Z6rotl32ii (; 9 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.rotl
   (get_local $0)
   (get_local $1)
  )
 )
 (func $_Z8rotmul32iii (; 10 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (i32.add
   (i32.shl
    (i32.add
     (i32.mul
      (i32.shr_u
       (tee_local $0
        (i32.rotl
         (get_local $0)
         (get_local $1)
        )
       )
       (i32.const 16)
      )
      (tee_local $1
       (i32.and
        (get_local $2)
        (i32.const 65535)
       )
      )
     )
     (i32.mul
      (tee_local $0
       (i32.and
        (get_local $0)
        (i32.const 65535)
       )
      )
      (i32.shr_u
       (get_local $2)
       (i32.const 16)
      )
     )
    )
    (i32.const 16)
   )
   (i32.mul
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $_Z10shiftxor32ii (; 11 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.xor
   (i32.shr_u
    (get_local $0)
    (get_local $1)
   )
   (get_local $0)
  )
 )
 (func $_Z8xxhapplyiiiii (; 12 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  (local $6 i32)
  (i32.add
   (i32.shl
    (i32.add
     (i32.mul
      (i32.shr_u
       (tee_local $2
        (i32.rotl
         (i32.add
          (i32.add
           (i32.mul
            (tee_local $6
             (i32.and
              (get_local $2)
              (i32.const 65535)
             )
            )
            (tee_local $5
             (i32.and
              (get_local $1)
              (i32.const 65535)
             )
            )
           )
           (get_local $0)
          )
          (i32.shl
           (i32.add
            (i32.mul
             (get_local $6)
             (i32.shr_u
              (get_local $1)
              (i32.const 16)
             )
            )
            (i32.mul
             (i32.shr_u
              (get_local $2)
              (i32.const 16)
             )
             (get_local $5)
            )
           )
           (i32.const 16)
          )
         )
         (get_local $3)
        )
       )
       (i32.const 16)
      )
      (tee_local $1
       (i32.and
        (get_local $4)
        (i32.const 65535)
       )
      )
     )
     (i32.mul
      (tee_local $2
       (i32.and
        (get_local $2)
        (i32.const 65535)
       )
      )
      (i32.shr_u
       (get_local $4)
       (i32.const 16)
      )
     )
    )
    (i32.const 16)
   )
   (i32.mul
    (get_local $2)
    (get_local $1)
   )
  )
 )
 (func $_Z4xxh1iPhi (; 13 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (i32.add
   (i32.shl
    (i32.add
     (i32.mul
      (tee_local $1
       (i32.and
        (i32.rotl
         (tee_local $0
          (i32.add
           (i32.mul
            (i32.load offset=2112
             (i32.const 0)
            )
            (i32.load8_u
             (i32.add
              (get_local $1)
              (get_local $2)
             )
            )
           )
           (get_local $0)
          )
         )
         (i32.const 11)
        )
        (i32.const 65535)
       )
      )
      (i32.shr_u
       (tee_local $2
        (i32.load offset=2096
         (i32.const 0)
        )
       )
       (i32.const 16)
      )
     )
     (i32.mul
      (i32.shr_u
       (get_local $0)
       (i32.const 5)
      )
      (tee_local $0
       (i32.and
        (get_local $2)
        (i32.const 65535)
       )
      )
     )
    )
    (i32.const 16)
   )
   (i32.mul
    (get_local $1)
    (get_local $0)
   )
  )
 )
 (func $_Z4xxh4iPhi (; 14 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (i32.add
   (i32.shl
    (i32.add
     (i32.mul
      (i32.shr_u
       (i32.rotl
        (tee_local $1
         (i32.add
          (i32.add
           (i32.mul
            (tee_local $4
             (i32.and
              (tee_local $3
               (i32.load offset=2104
                (i32.const 0)
               )
              )
              (i32.const 65535)
             )
            )
            (tee_local $2
             (i32.or
              (i32.shl
               (i32.load8_u
                (i32.add
                 (tee_local $1
                  (i32.add
                   (get_local $1)
                   (get_local $2)
                  )
                 )
                 (i32.const 1)
                )
               )
               (i32.const 8)
              )
              (i32.load8_u
               (get_local $1)
              )
             )
            )
           )
           (get_local $0)
          )
          (i32.shl
           (i32.add
            (i32.mul
             (i32.or
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $1)
                 (i32.const 3)
                )
               )
               (i32.const 8)
              )
              (i32.load8_u
               (i32.add
                (get_local $1)
                (i32.const 2)
               )
              )
             )
             (get_local $4)
            )
            (i32.mul
             (i32.shr_u
              (get_local $3)
              (i32.const 16)
             )
             (get_local $2)
            )
           )
           (i32.const 16)
          )
         )
        )
        (i32.const 17)
       )
       (i32.const 16)
      )
      (tee_local $2
       (i32.and
        (tee_local $0
         (i32.load offset=2108
          (i32.const 0)
         )
        )
        (i32.const 65535)
       )
      )
     )
     (i32.mul
      (tee_local $1
       (i32.and
        (i32.shr_u
         (get_local $1)
         (i32.const 15)
        )
        (i32.const 65535)
       )
      )
      (i32.shr_u
       (get_local $0)
       (i32.const 16)
      )
     )
    )
    (i32.const 16)
   )
   (i32.mul
    (get_local $1)
    (get_local $2)
   )
  )
 )
 (func $_Z5xxh16PxPhi (; 15 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (i64.store
   (get_local $0)
   (i64.extend_s/i32
    (i32.add
     (i32.shl
      (i32.add
       (i32.mul
        (tee_local $6
         (i32.and
          (i32.rotl
           (tee_local $2
            (i32.add
             (i32.add
              (i32.mul
               (tee_local $4
                (i32.and
                 (tee_local $3
                  (i32.load offset=2100
                   (i32.const 0)
                  )
                 )
                 (i32.const 65535)
                )
               )
               (tee_local $2
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (tee_local $1
                     (i32.add
                      (get_local $1)
                      (get_local $2)
                     )
                    )
                    (i32.const 1)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (get_local $1)
                 )
                )
               )
              )
              (i32.load
               (get_local $0)
              )
             )
             (i32.shl
              (i32.add
               (i32.mul
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 3)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 2)
                  )
                 )
                )
                (get_local $4)
               )
               (i32.mul
                (tee_local $3
                 (i32.shr_u
                  (get_local $3)
                  (i32.const 16)
                 )
                )
                (get_local $2)
               )
              )
              (i32.const 16)
             )
            )
           )
           (i32.const 13)
          )
          (i32.const 65535)
         )
        )
        (tee_local $7
         (i32.shr_u
          (tee_local $5
           (i32.load offset=2096
            (i32.const 0)
           )
          )
          (i32.const 16)
         )
        )
       )
       (i32.mul
        (i32.shr_u
         (get_local $2)
         (i32.const 3)
        )
        (tee_local $2
         (i32.and
          (get_local $5)
          (i32.const 65535)
         )
        )
       )
      )
      (i32.const 16)
     )
     (i32.mul
      (get_local $6)
      (get_local $2)
     )
    )
   )
  )
  (i64.store offset=8
   (get_local $0)
   (i64.extend_s/i32
    (i32.add
     (i32.shl
      (i32.add
       (i32.mul
        (tee_local $5
         (i32.and
          (i32.rotl
           (tee_local $6
            (i32.add
             (i32.add
              (i32.mul
               (get_local $4)
               (tee_local $6
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 5)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 4)
                  )
                 )
                )
               )
              )
              (i32.load offset=8
               (get_local $0)
              )
             )
             (i32.shl
              (i32.add
               (i32.mul
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 7)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 6)
                  )
                 )
                )
                (get_local $4)
               )
               (i32.mul
                (get_local $3)
                (get_local $6)
               )
              )
              (i32.const 16)
             )
            )
           )
           (i32.const 13)
          )
          (i32.const 65535)
         )
        )
        (get_local $7)
       )
       (i32.mul
        (i32.shr_u
         (get_local $6)
         (i32.const 3)
        )
        (get_local $2)
       )
      )
      (i32.const 16)
     )
     (i32.mul
      (get_local $5)
      (get_local $2)
     )
    )
   )
  )
  (i64.store offset=16
   (get_local $0)
   (i64.extend_s/i32
    (i32.add
     (i32.shl
      (i32.add
       (i32.mul
        (tee_local $3
         (i32.and
          (i32.rotl
           (tee_local $4
            (i32.add
             (i32.add
              (i32.mul
               (get_local $4)
               (tee_local $6
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 9)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 8)
                  )
                 )
                )
               )
              )
              (i32.load offset=16
               (get_local $0)
              )
             )
             (i32.shl
              (i32.add
               (i32.mul
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 11)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 10)
                  )
                 )
                )
                (get_local $4)
               )
               (i32.mul
                (get_local $3)
                (get_local $6)
               )
              )
              (i32.const 16)
             )
            )
           )
           (i32.const 13)
          )
          (i32.const 65535)
         )
        )
        (get_local $7)
       )
       (i32.mul
        (i32.shr_u
         (get_local $4)
         (i32.const 3)
        )
        (get_local $2)
       )
      )
      (i32.const 16)
     )
     (i32.mul
      (get_local $3)
      (get_local $2)
     )
    )
   )
  )
  (i64.store offset=24
   (get_local $0)
   (i64.extend_s/i32
    (i32.add
     (i32.shl
      (i32.add
       (i32.mul
        (tee_local $4
         (i32.and
          (i32.rotl
           (tee_local $1
            (i32.add
             (i32.add
              (i32.mul
               (tee_local $2
                (i32.and
                 (tee_local $4
                  (i32.load offset=2100
                   (i32.const 0)
                  )
                 )
                 (i32.const 65535)
                )
               )
               (tee_local $3
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 13)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 12)
                  )
                 )
                )
               )
              )
              (i32.load offset=24
               (get_local $0)
              )
             )
             (i32.shl
              (i32.add
               (i32.mul
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $1)
                    (i32.const 15)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $1)
                   (i32.const 14)
                  )
                 )
                )
                (get_local $2)
               )
               (i32.mul
                (i32.shr_u
                 (get_local $4)
                 (i32.const 16)
                )
                (get_local $3)
               )
              )
              (i32.const 16)
             )
            )
           )
           (i32.const 13)
          )
          (i32.const 65535)
         )
        )
        (i32.shr_u
         (tee_local $2
          (i32.load offset=2096
           (i32.const 0)
          )
         )
         (i32.const 16)
        )
       )
       (i32.mul
        (i32.shr_u
         (get_local $1)
         (i32.const 3)
        )
        (tee_local $1
         (i32.and
          (get_local $2)
          (i32.const 65535)
         )
        )
       )
      )
      (i32.const 16)
     )
     (i32.mul
      (get_local $4)
      (get_local $1)
     )
    )
   )
  )
  (get_local $0)
 )
 (func $_Z5xxh32jPhji (; 16 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (get_local $3)
      (i32.const 16)
     )
    )
    (i64.store offset=32
     (i32.const 0)
     (i64.extend_u/i32
      (get_local $0)
     )
    )
    (i64.store offset=24
     (i32.const 0)
     (i64.extend_u/i32
      (i32.add
       (tee_local $11
        (i32.load offset=2100
         (i32.const 0)
        )
       )
       (get_local $0)
      )
     )
    )
    (i64.store offset=40
     (i32.const 0)
     (i64.extend_u/i32
      (i32.sub
       (get_local $0)
       (tee_local $10
        (i32.load offset=2096
         (i32.const 0)
        )
       )
      )
     )
    )
    (i64.store offset=16
     (i32.const 0)
     (i64.extend_u/i32
      (i32.add
       (get_local $11)
       (i32.add
        (get_local $10)
        (get_local $0)
       )
      )
     )
    )
    (set_local $10
     (i32.add
      (tee_local $11
       (i32.and
        (i32.add
         (i32.add
          (select
           (tee_local $0
            (i32.xor
             (get_local $3)
             (i32.const -1)
            )
           )
           (i32.const -32)
           (i32.gt_s
            (get_local $0)
            (i32.const -32)
           )
          )
          (get_local $3)
         )
         (i32.const 16)
        )
        (i32.const -16)
       )
      )
      (get_local $2)
     )
    )
    (set_local $0
     (i32.add
      (get_local $3)
      (i32.const 16)
     )
    )
    (set_local $9
     (i32.add
      (get_local $3)
      (i32.const -16)
     )
    )
    (loop $label$2
     (drop
      (call $_Z5xxh16PxPhi
       (i32.const 16)
       (get_local $1)
       (get_local $2)
      )
     )
     (set_local $2
      (i32.add
       (get_local $2)
       (i32.const 16)
      )
     )
     (br_if $label$2
      (i32.gt_s
       (tee_local $0
        (i32.add
         (get_local $0)
         (i32.const -16)
        )
       )
       (i32.const 31)
      )
     )
    )
    (set_local $0
     (i32.add
      (i32.add
       (i32.add
        (i32.rotl
         (i32.load offset=16
          (i32.const 0)
         )
         (i32.const 1)
        )
        (get_local $3)
       )
       (i32.rotl
        (i32.load offset=24
         (i32.const 0)
        )
        (i32.const 7)
       )
      )
      (i32.rotl
       (i32.load offset=32
        (i32.const 0)
       )
       (i32.const 12)
      )
     )
    )
    (set_local $3
     (i32.sub
      (get_local $9)
      (get_local $11)
     )
    )
    (set_local $2
     (i32.add
      (get_local $10)
      (i32.const 16)
     )
    )
    (set_local $11
     (i32.rotl
      (i32.load offset=40
       (i32.const 0)
      )
      (i32.const 18)
     )
    )
    (br $label$0)
   )
   (set_local $0
    (i32.add
     (get_local $3)
     (get_local $0)
    )
   )
   (set_local $11
    (i32.load offset=2112
     (i32.const 0)
    )
   )
  )
  (set_local $0
   (i32.add
    (get_local $0)
    (get_local $11)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.lt_s
     (get_local $3)
     (i32.const 4)
    )
   )
   (set_local $7
    (i32.add
     (get_local $2)
     (tee_local $6
      (i32.and
       (i32.add
        (i32.add
         (get_local $3)
         (select
          (tee_local $11
           (i32.xor
            (get_local $3)
            (i32.const -1)
           )
          )
          (i32.const -8)
          (i32.gt_s
           (get_local $11)
           (i32.const -8)
          )
         )
        )
        (i32.const 4)
       )
       (i32.const -4)
      )
     )
    )
   )
   (set_local $11
    (i32.add
     (get_local $3)
     (i32.const 4)
    )
   )
   (set_local $8
    (i32.add
     (get_local $3)
     (i32.const -4)
    )
   )
   (set_local $2
    (i32.add
     (i32.add
      (get_local $1)
      (get_local $2)
     )
     (i32.const 1)
    )
   )
   (set_local $3
    (i32.and
     (tee_local $10
      (i32.load offset=2108
       (i32.const 0)
      )
     )
     (i32.const 65535)
    )
   )
   (set_local $5
    (i32.shr_u
     (get_local $10)
     (i32.const 16)
    )
   )
   (set_local $10
    (i32.and
     (tee_local $9
      (i32.load offset=2104
       (i32.const 0)
      )
     )
     (i32.const 65535)
    )
   )
   (set_local $4
    (i32.shr_u
     (get_local $9)
     (i32.const 16)
    )
   )
   (loop $label$4
    (set_local $0
     (i32.add
      (i32.shl
       (i32.add
        (i32.mul
         (i32.shr_u
          (i32.rotl
           (tee_local $0
            (i32.add
             (i32.add
              (i32.mul
               (get_local $10)
               (tee_local $9
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (get_local $2)
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const -1)
                  )
                 )
                )
               )
              )
              (get_local $0)
             )
             (i32.shl
              (i32.add
               (i32.mul
                (i32.or
                 (i32.shl
                  (i32.load8_u
                   (i32.add
                    (get_local $2)
                    (i32.const 2)
                   )
                  )
                  (i32.const 8)
                 )
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 1)
                  )
                 )
                )
                (get_local $10)
               )
               (i32.mul
                (get_local $4)
                (get_local $9)
               )
              )
              (i32.const 16)
             )
            )
           )
           (i32.const 17)
          )
          (i32.const 16)
         )
         (get_local $3)
        )
        (i32.mul
         (tee_local $0
          (i32.and
           (i32.shr_u
            (get_local $0)
            (i32.const 15)
           )
           (i32.const 65535)
          )
         )
         (get_local $5)
        )
       )
       (i32.const 16)
      )
      (i32.mul
       (get_local $0)
       (get_local $3)
      )
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 4)
     )
    )
    (br_if $label$4
     (i32.gt_s
      (tee_local $11
       (i32.add
        (get_local $11)
        (i32.const -4)
       )
      )
      (i32.const 7)
     )
    )
   )
   (set_local $3
    (i32.sub
     (get_local $8)
     (get_local $6)
    )
   )
   (set_local $2
    (i32.add
     (get_local $7)
     (i32.const 4)
    )
   )
  )
  (block $label$5
   (br_if $label$5
    (i32.lt_s
     (get_local $3)
     (i32.const 1)
    )
   )
   (set_local $11
    (i32.add
     (get_local $3)
     (i32.const 1)
    )
   )
   (set_local $2
    (i32.add
     (get_local $1)
     (get_local $2)
    )
   )
   (set_local $3
    (i32.and
     (tee_local $10
      (i32.load offset=2096
       (i32.const 0)
      )
     )
     (i32.const 65535)
    )
   )
   (set_local $9
    (i32.shr_u
     (get_local $10)
     (i32.const 16)
    )
   )
   (set_local $1
    (i32.load offset=2112
     (i32.const 0)
    )
   )
   (loop $label$6
    (set_local $0
     (i32.add
      (i32.shl
       (i32.add
        (i32.mul
         (tee_local $10
          (i32.and
           (i32.rotl
            (tee_local $0
             (i32.add
              (i32.mul
               (get_local $1)
               (i32.load8_u
                (get_local $2)
               )
              )
              (get_local $0)
             )
            )
            (i32.const 11)
           )
           (i32.const 65535)
          )
         )
         (get_local $9)
        )
        (i32.mul
         (i32.shr_u
          (get_local $0)
          (i32.const 5)
         )
         (get_local $3)
        )
       )
       (i32.const 16)
      )
      (i32.mul
       (get_local $10)
       (get_local $3)
      )
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (br_if $label$6
     (i32.gt_s
      (tee_local $11
       (i32.add
        (get_local $11)
        (i32.const -1)
       )
      )
      (i32.const 1)
     )
    )
   )
  )
  (i32.xor
   (i32.shr_u
    (tee_local $2
     (i32.add
      (i32.shl
       (i32.add
        (i32.mul
         (i32.shr_u
          (tee_local $2
           (i32.xor
            (i32.shr_u
             (tee_local $2
              (i32.add
               (i32.shl
                (i32.add
                 (i32.mul
                  (tee_local $11
                   (i32.and
                    (tee_local $2
                     (i32.load offset=2100
                      (i32.const 0)
                     )
                    )
                    (i32.const 65535)
                   )
                  )
                  (i32.shr_u
                   (tee_local $0
                    (i32.xor
                     (i32.shr_u
                      (get_local $0)
                      (i32.const 15)
                     )
                     (get_local $0)
                    )
                   )
                   (i32.const 16)
                  )
                 )
                 (i32.mul
                  (i32.shr_u
                   (get_local $2)
                   (i32.const 16)
                  )
                  (tee_local $2
                   (i32.and
                    (get_local $0)
                    (i32.const 65535)
                   )
                  )
                 )
                )
                (i32.const 16)
               )
               (i32.mul
                (get_local $11)
                (get_local $2)
               )
              )
             )
             (i32.const 13)
            )
            (get_local $2)
           )
          )
          (i32.const 16)
         )
         (tee_local $11
          (i32.and
           (tee_local $0
            (i32.load offset=2104
             (i32.const 0)
            )
           )
           (i32.const 65535)
          )
         )
        )
        (i32.mul
         (tee_local $2
          (i32.and
           (get_local $2)
           (i32.const 65535)
          )
         )
         (i32.shr_u
          (get_local $0)
          (i32.const 16)
         )
        )
       )
       (i32.const 16)
      )
      (i32.mul
       (get_local $2)
       (get_local $11)
      )
     )
    )
    (i32.const 16)
   )
   (get_local $2)
  )
 )
 (func $_Z15decompressBlockPhS_jjj (; 17 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (block $label$0
   (br_if $label$0
    (i32.le_u
     (tee_local $5
      (i32.add
       (get_local $3)
       (get_local $2)
      )
     )
     (get_local $2)
    )
   )
   (loop $label$1
    (set_local $3
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.eqz
         (tee_local $2
          (i32.shr_u
           (tee_local $6
            (i32.load8_u
             (i32.add
              (get_local $0)
              (get_local $2)
             )
            )
           )
           (i32.const 4)
          )
         )
        )
       )
       (block $label$5
        (block $label$6
         (br_if $label$6
          (i32.ne
           (get_local $2)
           (i32.const 15)
          )
         )
         (set_local $2
          (i32.const 15)
         )
         (loop $label$7
          (set_local $2
           (i32.add
            (get_local $2)
            (tee_local $9
             (i32.load8_u
              (i32.add
               (get_local $0)
               (get_local $3)
              )
             )
            )
           )
          )
          (set_local $3
           (tee_local $7
            (i32.add
             (get_local $3)
             (i32.const 1)
            )
           )
          )
          (br_if $label$7
           (i32.eq
            (get_local $9)
            (i32.const 255)
           )
          )
          (br $label$5)
         )
        )
        (set_local $7
         (get_local $3)
        )
       )
       (br_if $label$3
        (i32.ge_u
         (get_local $7)
         (tee_local $3
          (i32.add
           (get_local $2)
           (get_local $7)
          )
         )
        )
       )
       (set_local $9
        (i32.add
         (get_local $1)
         (get_local $4)
        )
       )
       (set_local $7
        (i32.add
         (get_local $0)
         (get_local $7)
        )
       )
       (set_local $8
        (get_local $2)
       )
       (loop $label$8
        (i32.store8
         (get_local $9)
         (i32.load8_u
          (get_local $7)
         )
        )
        (set_local $9
         (i32.add
          (get_local $9)
          (i32.const 1)
         )
        )
        (set_local $7
         (i32.add
          (get_local $7)
          (i32.const 1)
         )
        )
        (br_if $label$8
         (tee_local $8
          (i32.add
           (get_local $8)
           (i32.const -1)
          )
         )
        )
       )
       (set_local $4
        (i32.add
         (get_local $4)
         (get_local $2)
        )
       )
      )
      (br_if $label$2
       (i32.lt_u
        (get_local $3)
        (get_local $5)
       )
      )
      (br $label$0)
     )
     (br_if $label$0
      (i32.ge_u
       (tee_local $3
        (get_local $7)
       )
       (get_local $5)
      )
     )
    )
    (set_local $8
     (i32.or
      (i32.shl
       (i32.load8_u
        (i32.add
         (tee_local $9
          (i32.add
           (get_local $0)
           (get_local $3)
          )
         )
         (i32.const 1)
        )
       )
       (i32.const 8)
      )
      (i32.load8_u
       (get_local $9)
      )
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 2)
     )
    )
    (block $label$9
     (block $label$10
      (br_if $label$10
       (i32.ne
        (tee_local $9
         (i32.and
          (get_local $6)
          (i32.const 15)
         )
        )
        (i32.const 15)
       )
      )
      (set_local $9
       (i32.const 15)
      )
      (loop $label$11
       (set_local $9
        (i32.add
         (get_local $9)
         (tee_local $7
          (i32.load8_u
           (i32.add
            (get_local $0)
            (get_local $3)
           )
          )
         )
        )
       )
       (set_local $3
        (tee_local $2
         (i32.add
          (get_local $3)
          (i32.const 1)
         )
        )
       )
       (br_if $label$11
        (i32.eq
         (get_local $7)
         (i32.const 255)
        )
       )
       (br $label$9)
      )
     )
     (set_local $2
      (get_local $3)
     )
    )
    (set_local $7
     (i32.add
      (tee_local $6
       (i32.load offset=2116
        (i32.const 0)
       )
      )
      (get_local $9)
     )
    )
    (block $label$12
     (block $label$13
      (block $label$14
       (br_if $label$14
        (i32.ne
         (get_local $8)
         (i32.const 1)
        )
       )
       (br_if $label$13
        (i32.ge_u
         (get_local $4)
         (tee_local $8
          (i32.add
           (get_local $7)
           (get_local $4)
          )
         )
        )
       )
       (set_local $9
        (i32.add
         (tee_local $3
          (i32.add
           (get_local $1)
           (get_local $4)
          )
         )
         (i32.const -1)
        )
       )
       (loop $label$15
        (i32.store8
         (get_local $3)
         (i32.load8_u
          (get_local $9)
         )
        )
        (set_local $3
         (i32.add
          (get_local $3)
          (i32.const 1)
         )
        )
        (br_if $label$15
         (tee_local $7
          (i32.add
           (get_local $7)
           (i32.const -1)
          )
         )
        )
       )
       (set_local $4
        (get_local $8)
       )
       (br_if $label$1
        (i32.lt_u
         (get_local $2)
         (get_local $5)
        )
       )
       (br $label$0)
      )
      (br_if $label$12
       (i32.le_u
        (get_local $8)
        (get_local $7)
       )
      )
      (br_if $label$12
       (i32.lt_u
        (get_local $7)
        (i32.const 32)
       )
      )
      (set_local $3
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (set_local $8
       (i32.sub
        (i32.const 0)
        (get_local $8)
       )
      )
      (set_local $9
       (get_local $7)
      )
      (loop $label$16
       (i32.store8
        (get_local $3)
        (i32.load8_u
         (i32.add
          (get_local $3)
          (get_local $8)
         )
        )
       )
       (set_local $3
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (br_if $label$16
        (tee_local $9
         (i32.add
          (get_local $9)
          (i32.const -1)
         )
        )
       )
      )
      (set_local $4
       (i32.add
        (get_local $7)
        (get_local $4)
       )
      )
      (br_if $label$1
       (i32.lt_u
        (get_local $2)
        (get_local $5)
       )
      )
      (br $label$0)
     )
     (set_local $4
      (get_local $8)
     )
     (br_if $label$1
      (i32.lt_u
       (get_local $2)
       (get_local $5)
      )
     )
     (br $label$0)
    )
    (block $label$17
     (br_if $label$17
      (i32.ge_u
       (tee_local $3
        (i32.sub
         (get_local $4)
         (get_local $8)
        )
       )
       (i32.add
        (get_local $7)
        (get_local $3)
       )
      )
     )
     (set_local $3
      (i32.add
       (get_local $1)
       (get_local $4)
      )
     )
     (set_local $8
      (i32.sub
       (i32.const 0)
       (get_local $8)
      )
     )
     (set_local $7
      (i32.add
       (get_local $6)
       (get_local $9)
      )
     )
     (set_local $9
      (i32.add
       (get_local $4)
       (get_local $9)
      )
     )
     (loop $label$18
      (i32.store8
       (get_local $3)
       (i32.load8_u
        (i32.add
         (get_local $3)
         (get_local $8)
        )
       )
      )
      (set_local $3
       (i32.add
        (get_local $3)
        (i32.const 1)
       )
      )
      (br_if $label$18
       (tee_local $7
        (i32.add
         (get_local $7)
         (i32.const -1)
        )
       )
      )
     )
     (set_local $4
      (i32.add
       (get_local $9)
       (get_local $6)
      )
     )
    )
    (br_if $label$1
     (i32.lt_u
      (get_local $2)
      (get_local $5)
     )
    )
   )
  )
  (get_local $4)
 )
 (func $_Z15decompressFramePhjS_j (; 18 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.ne
       (i32.and
        (i32.load offset=2140
         (i32.const 0)
        )
        (tee_local $10
         (i32.load8_u offset=4
          (get_local $0)
         )
        )
       )
       (i32.load offset=2136
        (i32.const 0)
       )
      )
     )
     (br_if $label$0
      (i32.eqz
       (i32.load
        (i32.add
         (i32.shl
          (i32.and
           (i32.shr_u
            (i32.load8_u offset=5
             (get_local $0)
            )
            (i32.load offset=2148
             (i32.const 0)
            )
           )
           (i32.load offset=2152
            (i32.const 0)
           )
          )
          (i32.const 2)
         )
         (i32.const 2160)
        )
       )
      )
     )
     (set_local $4
      (select
       (i32.const 8)
       (i32.const 4)
       (i32.and
        (i32.load offset=2132
         (i32.const 0)
        )
        (get_local $10)
       )
      )
     )
     (set_local $11
      (select
       (i32.const 15)
       (i32.const 7)
       (i32.and
        (i32.load offset=2128
         (i32.const 0)
        )
        (get_local $10)
       )
      )
     )
     (set_local $6
      (i32.const 0)
     )
     (set_local $5
      (i32.const 0)
     )
     (br $label$1)
    )
    (call $_Z7onErrorPc
     (i32.const 2224)
    )
    (return
     (i32.const 0)
    )
   )
   (loop $label$3
    (block $label$4
     (block $label$5
      (block $label$6
       (br_if $label$6
        (i32.eqz
         (tee_local $10
          (i32.load align=1
           (i32.add
            (get_local $0)
            (get_local $11)
           )
          )
         )
        )
       )
       (set_local $11
        (i32.add
         (get_local $11)
         (get_local $4)
        )
       )
       (block $label$7
        (br_if $label$7
         (i32.and
          (tee_local $7
           (i32.load offset=2144
            (i32.const 0)
           )
          )
          (get_local $10)
         )
        )
        (br_if $label$6
         (i32.gt_u
          (i32.add
           (get_local $10)
           (get_local $6)
          )
          (get_local $3)
         )
        )
        (set_local $6
         (call $_Z15decompressBlockPhS_jjj
          (get_local $0)
          (get_local $2)
          (get_local $11)
          (get_local $10)
          (get_local $6)
         )
        )
        (set_local $11
         (i32.add
          (get_local $10)
          (get_local $11)
         )
        )
        (br $label$4)
       )
       (br_if $label$4
        (i32.eqz
         (tee_local $7
          (i32.and
           (get_local $10)
           (i32.xor
            (get_local $7)
            (i32.const -1)
           )
          )
         )
        )
       )
       (set_local $9
        (i32.add
         (get_local $0)
         (get_local $11)
        )
       )
       (set_local $8
        (i32.add
         (get_local $2)
         (get_local $6)
        )
       )
       (set_local $10
        (i32.const 0)
       )
       (block $label$8
        (loop $label$9
         (br_if $label$8
          (i32.ge_u
           (i32.add
            (get_local $11)
            (get_local $10)
           )
           (get_local $3)
          )
         )
         (i32.store8
          (i32.add
           (get_local $8)
           (get_local $10)
          )
          (i32.load8_u
           (i32.add
            (get_local $9)
            (get_local $10)
           )
          )
         )
         (br_if $label$9
          (i32.lt_u
           (tee_local $10
            (i32.add
             (get_local $10)
             (i32.const 1)
            )
           )
           (get_local $7)
          )
         )
         (br $label$5)
        )
       )
       (set_local $6
        (i32.add
         (get_local $6)
         (get_local $10)
        )
       )
      )
      (return
       (get_local $6)
      )
     )
     (set_local $11
      (i32.add
       (get_local $11)
       (get_local $10)
      )
     )
     (set_local $6
      (i32.add
       (get_local $6)
       (get_local $10)
      )
     )
    )
    (br_if $label$3
     (i32.le_u
      (i32.shr_u
       (get_local $6)
       (i32.const 27)
      )
      (get_local $5)
     )
    )
    (call $_Z11lz4Callbackj
     (get_local $6)
    )
    (set_local $5
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (br $label$3)
   )
  )
  (call $_Z7onErrorPc
   (i32.const 2256)
  )
  (i32.const 0)
 )
 (func $_Z12compareStonehhhh (; 19 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (i32.add
   (i32.sub
    (get_local $1)
    (get_local $3)
   )
   (i32.shl
    (i32.sub
     (get_local $0)
     (get_local $2)
    )
    (i32.const 5)
   )
  )
 )
 (func $_Z13compareStonesPhS_ii (; 20 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $5
     (i32.add
      (get_local $0)
      (get_local $3)
     )
    )
    (set_local $4
     (i32.add
      (get_local $1)
      (get_local $3)
     )
    )
    (set_local $3
     (i32.const 0)
    )
    (loop $label$2
     (br_if $label$0
      (tee_local $0
       (i32.add
        (i32.sub
         (i32.load8_u
          (i32.add
           (tee_local $0
            (i32.add
             (get_local $5)
             (get_local $3)
            )
           )
           (i32.const 1)
          )
         )
         (i32.load8_u
          (i32.add
           (tee_local $1
            (i32.add
             (get_local $4)
             (get_local $3)
            )
           )
           (i32.const 1)
          )
         )
        )
        (i32.shl
         (i32.sub
          (i32.load8_u
           (get_local $0)
          )
          (i32.load8_u
           (get_local $1)
          )
         )
         (i32.const 5)
        )
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
    (return
     (i32.const 0)
    )
   )
   (return
    (i32.const 0)
   )
  )
  (get_local $0)
 )
 (func $_Z18databaseKeyComparePhS_ (; 21 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (br_if $label$0
    (tee_local $5
     (i32.sub
      (i32.load8_u offset=2
       (get_local $0)
      )
      (i32.load8_u offset=2
       (get_local $1)
      )
     )
    )
   )
   (br_if $label$0
    (tee_local $5
     (i32.sub
      (i32.load8_u offset=3
       (get_local $0)
      )
      (i32.load8_u offset=3
       (get_local $1)
      )
     )
    )
   )
   (br_if $label$0
    (tee_local $5
     (i32.sub
      (i32.load8_u offset=4
       (get_local $0)
      )
      (i32.load8_u offset=4
       (get_local $1)
      )
     )
    )
   )
   (set_local $2
    (i32.add
     (tee_local $4
      (i32.or
       (i32.shl
        (i32.load8_u offset=1
         (get_local $0)
        )
        (i32.const 8)
       )
       (i32.load8_u
        (get_local $0)
       )
      )
     )
     (i32.const -3)
    )
   )
   (block $label$1
    (br_if $label$1
     (i32.ne
      (get_local $4)
      (tee_local $5
       (i32.or
        (i32.shl
         (i32.load8_u offset=1
          (get_local $1)
         )
         (i32.const 8)
        )
        (i32.load8_u
         (get_local $1)
        )
       )
      )
     )
    )
    (set_local $5
     (i32.const 0)
    )
    (br_if $label$0
     (i32.lt_u
      (get_local $4)
      (i32.const 4)
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (loop $label$2
     (br_if $label$0
      (tee_local $5
       (i32.add
        (i32.sub
         (i32.load8_u
          (i32.add
           (tee_local $5
            (i32.add
             (get_local $0)
             (get_local $4)
            )
           )
           (i32.const 6)
          )
         )
         (i32.load8_u
          (i32.add
           (tee_local $3
            (i32.add
             (get_local $1)
             (get_local $4)
            )
           )
           (i32.const 6)
          )
         )
        )
        (i32.shl
         (i32.sub
          (i32.load8_u
           (i32.add
            (get_local $5)
            (i32.const 5)
           )
          )
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.const 5)
           )
          )
         )
         (i32.const 5)
        )
       )
      )
     )
     (set_local $5
      (i32.const 0)
     )
     (br_if $label$2
      (i32.lt_s
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 2)
        )
       )
       (get_local $2)
      )
     )
     (br $label$0)
    )
   )
   (return
    (i32.sub
     (get_local $2)
     (i32.add
      (get_local $5)
      (i32.const -3)
     )
    )
   )
  )
  (get_local $5)
 )
 (func $_Z11nextNewNodev (; 22 ;) (result i64)
  (local $0 i32)
  (i32.store offset=2276
   (i32.const 0)
   (i32.add
    (i32.load offset=2276
     (i32.const 0)
    )
    (i32.const 1)
   )
  )
  (i32.store offset=2280
   (i32.const 0)
   (tee_local $0
    (i32.add
     (i32.load offset=2280
      (i32.const 0)
     )
     (i32.const 2)
    )
   )
  )
  (select
   (i64.extend_u/i32
    (get_local $0)
   )
   (i64.const -1)
   (i32.lt_u
    (get_local $0)
    (i32.load offset=2284
     (i32.const 0)
    )
   )
  )
 )
 (func $_Z9nodeValuej (; 23 ;) (param $0 i32) (result i32)
  (i32.load
   (i32.add
    (i32.load offset=2304
     (i32.const 0)
    )
    (i32.shl
     (get_local $0)
     (i32.const 2)
    )
   )
  )
 )
 (func $_Z8nodeNextj (; 24 ;) (param $0 i32) (result i32)
  (i32.load
   (i32.add
    (i32.add
     (i32.load offset=2304
      (i32.const 0)
     )
     (i32.shl
      (get_local $0)
      (i32.const 2)
     )
    )
    (i32.const 4)
   )
  )
 )
 (func $_Z8setValuejj (; 25 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.store
   (i32.add
    (i32.load offset=2304
     (i32.const 0)
    )
    (i32.shl
     (get_local $0)
     (i32.const 2)
    )
   )
   (get_local $1)
  )
  (get_local $1)
 )
 (func $_Z7setNextjj (; 26 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.store
   (i32.add
    (i32.add
     (i32.load offset=2304
      (i32.const 0)
     )
     (i32.shl
      (get_local $0)
      (i32.const 2)
     )
    )
    (i32.const 4)
   )
   (get_local $1)
  )
  (get_local $1)
 )
 (func $_Z6toHashPh (; 27 ;) (param $0 i32) (result i32)
  (i32.and
   (call $_Z5xxh32jPhji
    (i32.const 0)
    (get_local $0)
    (i32.const 0)
    (i32.add
     (i32.or
      (i32.shl
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const 8)
      )
      (i32.load8_u
       (get_local $0)
      )
     )
     (i32.const 2)
    )
   )
   (i32.const 4194303)
  )
 )
 (func $_Z5toKeyj (; 28 ;) (param $0 i32) (result i32)
  (i32.add
   (i32.load offset=2296
    (i32.const 0)
   )
   (get_local $0)
  )
 )
 (func $_Z7comparePhS_ (; 29 ;) (param $0 i32) (param $1 i32) (result i32)
  (call $_Z18databaseKeyComparePhS_
   (get_local $0)
   (get_local $1)
  )
 )
 (func $_Z4initPjjS_jPhj (; 30 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  (i32.store offset=2288
   (i32.const 0)
   (get_local $0)
  )
  (i32.store offset=2292
   (i32.const 0)
   (get_local $1)
  )
  (i32.store offset=2296
   (i32.const 0)
   (get_local $4)
  )
  (i32.store offset=2300
   (i32.const 0)
   (get_local $5)
  )
  (i32.store offset=2284
   (i32.const 0)
   (i32.add
    (get_local $3)
    (i32.const -1)
   )
  )
  (i32.store offset=2280
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=2276
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=2304
   (i32.const 0)
   (get_local $2)
  )
  (i32.store offset=2308
   (i32.const 0)
   (get_local $3)
  )
  (i32.const 1)
 )
 (func $_Z3getPh (; 31 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $3
   (call $_Z5xxh32jPhji
    (i32.const 0)
    (get_local $0)
    (i32.const 0)
    (i32.add
     (i32.or
      (i32.shl
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const 8)
      )
      (i32.load8_u
       (get_local $0)
      )
     )
     (i32.const 2)
    )
   )
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $3
       (i32.load
        (i32.add
         (i32.load offset=2288
          (i32.const 0)
         )
         (i32.and
          (i32.shl
           (get_local $3)
           (i32.const 3)
          )
          (i32.const 33554424)
         )
        )
       )
      )
     )
    )
    (set_local $2
     (i32.load offset=2296
      (i32.const 0)
     )
    )
    (set_local $1
     (i32.load offset=2304
      (i32.const 0)
     )
    )
    (loop $label$2
     (br_if $label$0
      (i32.eqz
       (call $_Z18databaseKeyComparePhS_
        (get_local $0)
        (i32.add
         (get_local $2)
         (tee_local $4
          (i32.load
           (tee_local $3
            (i32.add
             (get_local $1)
             (i32.shl
              (get_local $3)
              (i32.const 2)
             )
            )
           )
          )
         )
        )
       )
      )
     )
     (br_if $label$2
      (tee_local $3
       (i32.load
        (i32.add
         (get_local $3)
         (i32.const 4)
        )
       )
      )
     )
    )
   )
   (set_local $4
    (i32.const -1)
   )
  )
  (get_local $4)
 )
 (func $_Z3setPhj (; 32 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (local $7 i32)
  (set_local $0
   (call $_Z5xxh32jPhji
    (i32.const 0)
    (get_local $0)
    (i32.const 0)
    (i32.add
     (i32.or
      (i32.shl
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const 8)
      )
      (i32.load8_u
       (get_local $0)
      )
     )
     (i32.const 2)
    )
   )
  )
  (set_local $5
   (i32.load
    (tee_local $4
     (i32.add
      (tee_local $3
       (i32.load offset=2288
        (i32.const 0)
       )
      )
      (i32.shl
       (tee_local $2
        (i32.and
         (i32.shl
          (get_local $0)
          (i32.const 1)
         )
         (i32.const 8388606)
        )
       )
       (i32.const 2)
      )
     )
    )
   )
  )
  (i32.store offset=2276
   (i32.const 0)
   (i32.add
    (i32.load offset=2276
     (i32.const 0)
    )
    (i32.const 1)
   )
  )
  (i32.store offset=2280
   (i32.const 0)
   (tee_local $0
    (i32.add
     (i32.load offset=2280
      (i32.const 0)
     )
     (i32.const 2)
    )
   )
  )
  (set_local $0
   (i32.wrap/i64
    (tee_local $6
     (select
      (i64.extend_u/i32
       (get_local $0)
      )
      (i64.const -1)
      (i32.lt_u
       (get_local $0)
       (i32.load offset=2284
        (i32.const 0)
       )
      )
     )
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i64.eq
     (get_local $6)
     (i64.const -1)
    )
   )
   (i32.store
    (tee_local $7
     (i32.add
      (i32.load offset=2304
       (i32.const 0)
      )
      (i32.shl
       (get_local $0)
       (i32.const 2)
      )
     )
    )
    (get_local $1)
   )
   (i32.store
    (i32.add
     (get_local $7)
     (i32.const 4)
    )
    (get_local $5)
   )
   (i32.store
    (get_local $4)
    (get_local $0)
   )
   (i32.store
    (tee_local $1
     (i32.add
      (get_local $3)
      (i32.shl
       (i32.or
        (get_local $2)
        (i32.const 1)
       )
       (i32.const 2)
      )
     )
    )
    (i32.add
     (i32.load
      (get_local $1)
     )
     (i32.const 1)
    )
   )
  )
  (get_local $0)
 )
 (func $_Z12getMaxLengthv (; 33 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $3
   (i32.const 0)
  )
  (set_local $1
   (i32.add
    (i32.load offset=2288
     (i32.const 0)
    )
    (i32.const 33554428)
   )
  )
  (set_local $2
   (i32.const 8388608)
  )
  (loop $label$0
   (set_local $3
    (select
     (tee_local $0
      (i32.load
       (get_local $1)
      )
     )
     (get_local $3)
     (i32.gt_u
      (get_local $0)
      (get_local $3)
     )
    )
   )
   (set_local $1
    (i32.add
     (get_local $1)
     (i32.const -8)
    )
   )
   (br_if $label$0
    (i32.gt_s
     (tee_local $2
      (i32.add
       (get_local $2)
       (i32.const -2)
      )
     )
     (i32.const 1)
    )
   )
  )
  (get_local $3)
 )
 (func $_Z9nodeBytesv (; 34 ;) (result i32)
  (i32.const 8)
 )
 (func $_Z8nodeSizev (; 35 ;) (result i32)
  (i32.const 2)
 )
 (func $_Z9tableSizev (; 36 ;) (result i32)
  (i32.const 4194304)
 )
 (func $_Z10tableBytesv (; 37 ;) (result i32)
  (i32.const 33554432)
 )
 (func $_Z7getSizev (; 38 ;) (result i32)
  (i32.load offset=2276
   (i32.const 0)
  )
 )
 (func $_Z4loadv (; 39 ;) (result f64)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 f64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i64)
  (local $12 i32)
  (local $13 i32)
  (set_local $13
   (i32.const 0)
  )
  (set_local $3
   (f64.convert_u/i32
    (tee_local $2
     (i32.load align=1
      (tee_local $0
       (i32.load offset=2296
        (i32.const 0)
       )
      )
     )
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $2)
    )
   )
   (set_local $1
    (i32.load offset=2300
     (i32.const 0)
    )
   )
   (set_local $4
    (i32.const 4)
   )
   (set_local $13
    (i32.const 0)
   )
   (loop $label$1
    (block $label$2
     (br_if $label$2
      (i32.and
       (get_local $13)
       (i32.const 524287)
      )
     )
     (call $_Z14outputProgressd
      (f64.div
       (f64.convert_u/i32
        (get_local $13)
       )
       (get_local $3)
      )
     )
    )
    (br_if $label$0
     (i32.gt_u
      (tee_local $7
       (i32.add
        (get_local $4)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
    (br_if $label$0
     (i32.eqz
      (tee_local $6
       (i32.or
        (i32.shl
         (i32.load8_u
          (i32.add
           (tee_local $5
            (i32.add
             (get_local $0)
             (get_local $4)
            )
           )
           (i32.const 1)
          )
         )
         (i32.const 8)
        )
        (i32.load8_u
         (get_local $5)
        )
       )
      )
     )
    )
    (br_if $label$0
     (i32.gt_u
      (tee_local $7
       (i32.add
        (get_local $6)
        (get_local $7)
       )
      )
      (get_local $1)
     )
    )
    (br_if $label$0
     (i32.gt_u
      (tee_local $8
       (i32.add
        (get_local $7)
        (i32.const 2)
       )
      )
      (get_local $1)
     )
    )
    (br_if $label$0
     (i32.gt_u
      (tee_local $7
       (i32.add
        (i32.or
         (i32.shl
          (i32.load8_u
           (i32.add
            (tee_local $7
             (i32.add
              (get_local $0)
              (get_local $7)
             )
            )
            (i32.const 1)
           )
          )
          (i32.const 8)
         )
         (i32.load8_u
          (get_local $7)
         )
        )
        (get_local $8)
       )
      )
      (get_local $1)
     )
    )
    (set_local $5
     (call $_Z5xxh32jPhji
      (i32.const 0)
      (get_local $5)
      (i32.const 0)
      (i32.add
       (get_local $6)
       (i32.const 2)
      )
     )
    )
    (set_local $10
     (i32.load
      (tee_local $9
       (i32.add
        (tee_local $6
         (i32.load offset=2288
          (i32.const 0)
         )
        )
        (i32.shl
         (tee_local $8
          (i32.and
           (i32.shl
            (get_local $5)
            (i32.const 1)
           )
           (i32.const 8388606)
          )
         )
         (i32.const 2)
        )
       )
      )
     )
    )
    (i32.store offset=2276
     (i32.const 0)
     (i32.add
      (i32.load offset=2276
       (i32.const 0)
      )
      (i32.const 1)
     )
    )
    (i32.store offset=2280
     (i32.const 0)
     (tee_local $5
      (i32.add
       (i32.load offset=2280
        (i32.const 0)
       )
       (i32.const 2)
      )
     )
    )
    (set_local $5
     (i32.wrap/i64
      (tee_local $11
       (select
        (i64.extend_u/i32
         (get_local $5)
        )
        (i64.const -1)
        (i32.lt_u
         (get_local $5)
         (i32.load offset=2284
          (i32.const 0)
         )
        )
       )
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i64.eq
       (get_local $11)
       (i64.const -1)
      )
     )
     (i32.store
      (tee_local $12
       (i32.add
        (i32.load offset=2304
         (i32.const 0)
        )
        (i32.shl
         (get_local $5)
         (i32.const 2)
        )
       )
      )
      (get_local $4)
     )
     (i32.store
      (i32.add
       (get_local $12)
       (i32.const 4)
      )
      (get_local $10)
     )
     (i32.store
      (get_local $9)
      (get_local $5)
     )
     (i32.store
      (tee_local $4
       (i32.add
        (get_local $6)
        (i32.shl
         (i32.or
          (get_local $8)
          (i32.const 1)
         )
         (i32.const 2)
        )
       )
      )
      (i32.add
       (i32.load
        (get_local $4)
       )
       (i32.const 1)
      )
     )
    )
    (br_if $label$0
     (i32.eq
      (get_local $5)
      (i32.const -1)
     )
    )
    (set_local $4
     (get_local $7)
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $13
       (i32.add
        (get_local $13)
        (i32.const 1)
       )
      )
      (get_local $2)
     )
    )
   )
  )
  (f64.div
   (f64.convert_u/i32
    (get_local $13)
   )
   (get_local $3)
  )
 )
)
