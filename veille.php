<div class="ma-veille">
    <h2>Dernières actualités Tech</h2>
    <div class="timeline">
    <?php
    // URL du flux (ex: Developpez.com ou Programmez.com)
    $url = "https://www.developpez.com/index/rss"; 
    
    // Chargement du XML
    $rss = @simplexml_load_file($url); // Le @ masque les erreurs si le site ne répond pas

    if ($rss) {
        $i = 0;
        foreach ($rss->channel->item as $item) {
            if ($i >= 5) break; // On garde les 5 derniers
            
            $titre = $item->title;
            $lien = $item->link;
            // On formate la date proprement (Jour/Mois/Année)
            $date = date("d/m/Y", strtotime($item->pubDate));
            
            // NETTOYAGE : On enlève les balises HTML de la description
            $description = strip_tags($item->description);
            // On coupe si c'est plus long que 150 caractères
            if (strlen($description) > 150) {
                $description = substr($description, 0, 150) . "...";
            }

            // Affichage HTML structuré pour le CSS
            echo "<div class='timeline-item'>";
            echo "  <div class='date'>$date</div>";
            echo "  <div class='content'>";
            echo "      <h3><a href='$lien' target='_blank'>$titre</a></h3>";
            echo "      <p>$description</p>";
            echo "  </div>";
            echo "</div>";
            
            $i++;
        }
    } else {
        echo "<p>Flux indisponible pour le moment.</p>";
    }
    ?>
    </div>
</div>