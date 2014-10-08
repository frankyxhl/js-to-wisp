;; fs.readFile('/etc/passwd', function (err, data) {
  ;; if (err) throw err;
  ;; console.log(data);
;; });

(ns js-to-wisp.main
  "interactive code editing"
  (:require [wisp.sequence :refer [reduce]]
            [fs]
            [traverse]
            [utils :refer [recursive_scan]]
            [uglify-js :as uglifyjs]))

(defn read-file-sync [file-name]
  (.readFileSync fs file-name "utf8"
             (fn [err data] (if err
                              (throw err) 
                              data))))


(defn cons [arr-a arr-b]
  (.concat arr-a arr-b))

(defn car [arr]
  (if (.isArray Array arr)
    (get arr 1)
    (print arr " is not an array")))

(defn cdr [arr]
  (if (.isArray Array arr)
    (.slice arr 1 arr.length)
    (print arr "is not an array")))

(def ll {:a "A", :b "B" , :e [{:c "C", :d "D"}]})

(defn parse-code [buffer]
  (print (.stringify JSON (.parse uglifyjs buffer) null 4))
  ;; (loop [ast (.parse uglifyjs buffer)]
    ;; (if (is-array (:body ast))
      ;; (print)
      ;; (print (:start (:expression (:body ast))))
      ;; (recur (:body ast))))
)

(parse-code "sum(x, y);") ;
(parse-code (read-file-sync "test.js"))
(print "================")

;; (recursive_scan (.parse uglifyjs (read-file-sync "test.js")))

;; traverse(obj).forEach(function (x) {
    ;; if (x < 0) this.update(x + 128);
;; });



(defn check-token [body]
  (let [c (:type (:start body))]
    (cond
     (identical? c "name") (analyze-name body)
     (identical? c "keyword") (analyze-keyword body)
     :else (print "unkown token type" (.stringify JSON body null 4)))))

(defn analyze-args [body]
  (.join (.map (:args (:body body)) (fn [x] (:value (:start x)))) " "))

(defn analyze-name [body]
  (str "(" (:value (:start body)) " " (analyze-args body) ")"))

(defn analyze-keyword [body]
  (if (:name (:name body))
    (str "(defn " (:name (:name body)) " )")
    (str "(fn "  " )")))

(.forEach (traverse (.parse uglifyjs (read-file-sync "test.js"))) 
;; (.forEach (traverse (.parse uglifyjs "sum(x,y);")) 
          (fn [x]
            (if (and (:body x) this.notRoot)

              (print (check-token x)))))
