<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio 2025 - Jef Ly</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;600;900&family=Outfit:wght@300;500;700&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="style.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</head>

<body>

    <canvas id="gridCanvas"></canvas>

    <div class="cursor"></div>

    <section class="hero">
        <nav class="top-nav">
            <div class="nav-left">Jef Ly</div>
            <div class="nav-right">Étudiant BTS SIO</div>
        </nav>

        <div class="title-container">
            <h1 class="huge-title">
                PORT<br>
                FOLIO
                <span class="outlined-year">2025</span>
            </h1>
        </div>

        <div class="hero-intro">
            <p class="intro-hello">Hello ! Je suis Développeur.</p>
            <p class="hero-text">
                Passionné par l'automatisation, la cybersécurité et le développement web.
                Voici une sélection de mes projets académiques et personnels.
            </p>
        </div>

        <div class="scroll-indicator">SCROLL POUR DÉCOUVRIR ↓</div>
    </section>

    <section class="resume-section">
        <div class="resume-grid">
            <div class="resume-col">
                <h3 class="resume-title">✦ EXPÉRIENCES</h3>
                <div class="resume-item">
                    <span class="date">2025</span>
                    <h4>Stage BTS SIO</h4>
                    <span class="company">SOGÉCAP</span>
                    <p>Automatisation Python & Gestion d'incidents.</p>
                </div>
                <div class="resume-item">
                    <span class="date">2023 - 2025</span>
                    <h4>Employé Polyvalent</h4>
                    <span class="company">E.LECLERC DRIVE</span>
                </div>
            </div>
            <div class="resume-col">
                <h3 class="resume-title">✦ FORMATIONS</h3>
                <div class="resume-item">
                    <span class="date">En cours</span>
                    <h4>BTS SIO SLAM</h4>
                    <span class="company">Lycée Benjamin Franklin</span>
                </div>
                <div class="resume-item">
                    <span class="date">2022</span>
                    <h4>Licence 1 Info</h4>
                    <span class="company">Université d'Orléans</span>
                </div>
            </div>
        </div>
    </section>

    <div class="projects-wrapper">
        <div class="projects-header">SOMMAIRE DES PROJETS <span class="arrow">→</span></div>

        <div class="projects-container">
            <div class="project-card bento-square">
                <div class="card-header"><span class="project-number">.01</span>
                    <div class="tags"><span class="tag">RÉSEAU</span></div>
                </div>
                <h3 class="project-title">Ateliers Certif.</h3>
                <p class="project-desc">Auto-formation et bases techniques.</p>
            </div>
            <div class="project-card bento-tall">
                <div class="card-header"><span class="project-number">.02</span>
                    <div class="tags"><span class="tag">WEB</span></div>
                </div>
                <h3 class="project-title">Coffee Shop</h3>
                <p class="project-desc">Site E-commerce WordPress complet.</p>
                <div class="img-placeholder"></div>
            </div>
            <div class="project-card bento-wide">
                <div class="card-header"><span class="project-number">.03</span>
                    <div class="tags"><span class="tag">SEC</span></div>
                </div>
                <h3 class="project-title">GSB Secure</h3>
                <p class="project-desc">Sécurisation PHP/SQL et architecture MVC.</p>
            </div>
            <div class="project-card bento-square">
                <div class="card-header"><span class="project-number">.04</span>
                    <div class="tags"><span class="tag">UML</span></div>
                </div>
                <h3 class="project-title">Modélisation</h3>
                <p class="project-desc">Conception technique et diagrammes.</p>
            </div>
            <div class="project-card bento-square">
                <div class="card-header"><span class="project-number">.05</span>
                    <div class="tags"><span class="tag">VEILLE</span></div>
                </div>
                <h3 class="project-title">Tech Watch</h3>
                <p class="project-desc">Curation et surveillance technologique.</p>
            </div>
            <div class="project-card bento-square">
                <div class="card-header"><span class="project-number">.06</span>
                    <div class="tags"><span class="tag">AGILE</span></div>
                </div>
                <h3 class="project-title">Scrum Workflow</h3>
                <p class="project-desc">Gestion de projet collaborative.</p>
            </div>
            <div class="project-card bento-big">
                <div class="card-header"><span class="project-number">.07</span>
                    <div class="tags"><span class="tag">PYTHON</span></div>
                </div>
                <h3 class="project-title">Jira Automation</h3>
                <p class="project-desc">Scripting Python pour SOGECAP.</p>
                <div class="img-placeholder"></div>
            </div>
            <div class="project-card bento-wide">
                <div class="card-header"><span class="project-number">.08</span>
                    <div class="tags"><span class="tag">DESIGN</span></div>
                </div>
                <h3 class="project-title">Portfolio</h3>
                <p class="project-desc">Design Scrollytelling immersif.</p>
            </div>
            <div class="project-card bento-tall dashed-border">
                <div class="card-header"><span class="project-number">.09</span>
                    <div class="tags"><span class="tag">SOON</span></div>
                </div>
                <h3 class="project-title">Stage 2</h3>
                <p class="project-desc">À venir...</p>
            </div>
            <div class="project-card bento-square dashed-border">
                <div class="card-header"><span class="project-number">.10</span>
                    <div class="tags"><span class="tag">ANDROID</span></div>
                </div>
                <h3 class="project-title">App Mobile</h3>
                <p class="project-desc">Développement Kotlin/Java.</p>
            </div>
        </div>
    </div>

    <div class="details-wrapper">

        <section class="project-detail" id="p1">
            <div class="detail-header">
                <span class="big-num">.01</span>
                <h2>Ateliers de Certification</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">AUTO-FORMATION</span></div>
                    <p>Fil rouge de mes années de BTS SIO SLAM, ce parcours a pour but d'élargir mon horizon technique.
                        Au-delà de la simple maîtrise du code, ces ateliers structurent mon approche de l'informatique.
                    </p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image Ateliers</div>
                </div>
            </div>
        </section>

        <section class="project-detail reverse" id="p2">
            <div class="detail-header">
                <span class="big-num">.02</span>
                <h2>Coffee Shop</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">WORDPRESS</span><span class="tag">E-COMMERCE</span></div>
                    <p>Conception intégrale d'une boutique en ligne fictive dédiée à l'univers du café. Ce projet
                        explore la puissance de l'écosystème WordPress pour déployer une interface e-commerce moderne.
                    </p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image Coffee</div>
                </div>
            </div>
        </section>

        <section class="project-detail" id="p3">
            <div class="detail-header">
                <span class="big-num">.03</span>
                <h2>GSB : Secure App</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">PHP</span><span class="tag">CYBERSÉCURITÉ</span></div>
                    <p>Refonte et sécurisation critique de l'application GSB. Migration vers une architecture MVC
                        robuste tout en neutralisant les vulnérabilités majeures (Injections SQL, XSS).</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image GSB</div>
                </div>
            </div>
        </section>

        <section class="project-detail reverse" id="p4">
            <div class="detail-header">
                <span class="big-num">.04</span>
                <h2>UML Design</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">MODÉLISATION</span></div>
                    <p>L'étape cruciale avant le code. Traduire des besoins métiers complexes en architectures
                        logicielles claires (Diagrammes de cas d'utilisation, séquences, classes).</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image UML</div>
                </div>
            </div>
        </section>

        <section class="project-detail" id="p5">
            <div class="detail-header">
                <span class="big-num">.05</span><h2>Tech Watch</h2>
            </div>
            <div class="detail-content">
                
                <div class="detail-text" style="width: 100%;"> <div class="tags"><span class="tag">VEILLE</span> <span class="tag">FLUX RSS</span></div>
                    
                    <p style="margin-bottom: 30px;">
                        Ma veille technologique automatisée, sourcée directement depuis 01net :
                    </p>

                    <div class="ma-veille">
                        <h2>
                            <img src="https://www.01net.com/favicon.ico" alt="Logo 01net" style="vertical-align: middle; width: 30px; border-radius: 4px;"> 
                            Actualités 01net
                        </h2>
                        
                        <div class="timeline">
                        <?php
                        // 1. URL du flux RSS de 01net
                        $url = "https://www.01net.com/feed/"; 
                        
                        // URL du Logo
                        $logo_src = "https://www.01net.com/favicon.ico";

                        // 2. Chargement
                        $rss = @simplexml_load_file($url);

                        if ($rss) {
                            $i = 0;
                            foreach ($rss->channel->item as $item) {
                                if ($i >= 4) break; // J'ai mis 4 pour ne pas faire une page trop longue, tu peux remettre 5
                                
                                $titre = $item->title;
                                $lien = $item->link;
                                $date = date("d/m", strtotime($item->pubDate));
                                
                                $description = strip_tags($item->description);
                                if (strlen($description) > 100) {
                                    $description = substr($description, 0, 100) . "...";
                                }

                                echo "<div class='timeline-item'>";
                                echo "  <div class='date'>$date</div>";
                                echo "  <div class='content'>";
                                echo "      <h3>";
                                echo "      <img src='$logo_src' class='site-icon' alt='01net'> ";
                                echo "      <a href='$lien' target='_blank'>$titre</a>";
                                echo "      </h3>";
                                echo "      <p>$description</p>";
                                echo "  </div>";
                                echo "</div>";
                                
                                $i++;
                            }
                        } else {
                            echo "<p>Flux 01net indisponible pour le moment (Vérifiez votre connexion).</p>";
                        }
                        ?>
                        </div>
                    </div>
                    </div>
                
                <div class="detail-image">
                    <div class="img-placeholder-large">
                        <span style="font-size: 3rem;">📡</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="project-detail reverse" id="p6">
            <div class="detail-header">
                <span class="big-num">.06</span>
                <h2>Agile Workflow</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">SCRUM</span></div>
                    <p>Maîtrise des méthodologies collaboratives. Découpage en sprints, définition du Backlog et rituels
                        de suivi pour transformer des objectifs complexes en livrables concrets.</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image Agile</div>
                </div>
            </div>
        </section>

        <section class="project-detail" id="p7">
            <div class="detail-header">
                <span class="big-num">.07</span>
                <h2>Jira Automation</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">PYTHON</span><span class="tag">SOGECAP</span></div>
                    <p>Développement d'une solution d'automatisation pour la DSI de SOGECAP. Le script Python
                        s'interface avec l'API JIRA pour analyser et filtrer les tickets incidents automatiquement.</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image Python</div>
                </div>
            </div>
        </section>

        <section class="project-detail reverse" id="p8">
            <div class="detail-header">
                <span class="big-num">.08</span>
                <h2>Digital Identity</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">WEB DESIGN</span></div>
                    <p>Conception intégrale de ce portfolio. Du design de l'interface à l'intégration responsive, pensé
                        pour valoriser mon parcours et affirmer mon identité de développeur.</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large">Image Portfolio</div>
                </div>
            </div>
        </section>

        <section class="project-detail" id="p9">
            <div class="detail-header">
                <span class="big-num">.09</span>
                <h2>Stage 2ème Année</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">SOON</span></div>
                    <p>Immersion professionnelle à venir. L'objectif est d'intégrer une nouvelle structure et de relever
                        des défis techniques d'envergure.</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large dashed-border">En cours...</div>
                </div>
            </div>
        </section>

        <section class="project-detail reverse" id="p10">
            <div class="detail-header">
                <span class="big-num">.10</span>
                <h2>Android Lab</h2>
            </div>
            <div class="detail-content">
                <div class="detail-text">
                    <div class="tags"><span class="tag">MOBILE</span></div>
                    <p>Prochaine étape : le développement natif. Ambition de concevoir une application fonctionnelle et
                        intuitive sur l'écosystème Android.</p>
                </div>
                <div class="detail-image">
                    <div class="img-placeholder-large dashed-border">En cours...</div>
                </div>
            </div>
        </section>

    </div>

    <section class="footer">
        <h2 class="footer-title">Merci !</h2>
        <div class="footer-links">
            <a href="#" class="cta-button">LinkedIn</a>
            <a href="mailto:tonemail@gmail.com" class="cta-button">Email</a>
            <a href="#" class="cta-button">Veille Techno</a>
        </div>
    </section>

    <script src="script.js"></script>
</body>

</html>
