const animationTimeline = () => {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  if (!textBoxChars || !hbd) return; // Safety check

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

  const tl = gsap.timeline();

  // Smoothly fade in the container
  tl.to(".container", { duration: 0.8, opacity: 1 })
    .from(".one", { duration: 0.7, opacity: 0, y: 10 })
    .from(".two", { duration: 0.4, opacity: 0, y: 10 })
    .to(".one", { duration: 0.7, opacity: 0, y: 10 }, "+=2.5")
    .to(".two", { duration: 0.7, opacity: 0, y: 10 }, "-=1")
    .from(".three", { duration: 0.7, opacity: 0, y: 10 })
    .to(".three", { duration: 0.7, opacity: 0, y: 10 }, "+=2")
    .from(".four", { duration: 0.7, scale: 0.2, opacity: 0 })
    .from(".fake-btn", { duration: 0.3, scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.1, { opacity: 1, visibility: "visible" }, 0.05)
    .to(".fake-btn", { duration: 0.1, backgroundColor: "#bc1888", color: "#fff" })
    .to(".four", { duration: 0.5, scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    
    .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
    .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
    .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-3 strong", { duration: 0.5, scale: 1.2, x: 10, backgroundColor: "#dc2743", color: "#fff" })
    .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
    .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
    
    .from(".idea-5", { duration: 0.7, rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=0.5")
    .to(".idea-5 span", { duration: 0.7, rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", { duration: 0.7, scale: 0.2, opacity: 0 }, "+=2")
    
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: "power2.out" }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: "power2.out" }, 0.2, "+=1")
    
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".girl-dp", { duration: 0.5, scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: "elastic.out(1, 0.5)" }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#fff", ease: "power2.out" }, 0.1, "party")
    .from(".wish h5", { duration: 0.5, opacity: 0, y: 10, skewX: "-15deg" }, "party")
    
    .to(".six", { duration: 0.5, opacity: 0, y: 30, zIndex: "-1" }, "+=3")
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", { duration: 0.5, rotation: 90 }, "+=1")
    .to(".btn-group", { duration: 0.5, opacity: 1, y: -20 });

  document.getElementById("replay").addEventListener("click", () => {
    tl.restart();
  });

  document.getElementById("goToCube").addEventListener("click", () => {
    window.location.href = "last.html";
  });
};

// Safe Fetch to prevent local file:// crashes
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            const img = document.getElementById(customData);
            if(img) img.setAttribute("src", data[customData]);
          } else {
            const el = document.getElementById(customData);
            if(el) el.innerText = data[customData];
          }
        }
      });
    })
    .catch((err) => {
      console.log("Local testing detected. Custom JSON skipped.", err);
    });
};

fetchData();
setTimeout(animationTimeline, 500);